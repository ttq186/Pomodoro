from datetime import datetime
from typing import List

from fastapi import APIRouter, Depends, status
from fastapi.encoders import jsonable_encoder
from fastapi_cache.decorator import cache
from sqlalchemy.orm import Session

from app import crud, exceptions, models, schemas
from app.api.v1 import deps

router = APIRouter(prefix="/api/tasks", tags=["Tasks"])


@router.get("", response_model=List[schemas.TaskOut])
@cache(expire=60)
async def get_tasks(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = None,
    current_user: models.User = Depends(deps.get_current_user),
):
    """Retrieve tasks by role."""
    if crud.user.is_admin(current_user):
        tasks = crud.task.get_multi(db, skip=skip, limit=limit)
    else:
        tasks = crud.task.get_multi_by_owner(
            db, owner_id=current_user.id, skip=skip, limit=limit
        )
    return tasks


@router.get("/{id}", response_model=schemas.TaskOut)
async def get_task(
    id: int,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_user),
):
    """Retrieve a specific task."""
    task = crud.task.get(db, id=id)
    if task is None:
        raise exceptions.ResourceNotFound(resource_type="Task", id=id)
    if not crud.user.is_admin(current_user) and (task.user_id != current_user.id):
        raise exceptions.NotAuthorized()
    return task


@router.post("", response_model=schemas.TaskOut)
async def create_task(
    task_in: schemas.TaskCreate,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_user),
):
    """Create a new task."""
    task_in.user_id = current_user.id
    new_task = crud.task.create(db, obj_in=task_in)
    return new_task


@router.put("/{id}", response_model=schemas.TaskOut)
async def update_task(
    id: int,
    payload: schemas.TaskUpdate,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_user),
):
    """Update a specific task."""
    task = crud.task.get(db, id=id)
    if task is None:
        raise exceptions.ResourceNotFound(resource_type="Task", id=id)
    if not crud.user.is_admin(current_user) and (task.user_id != current_user.id):
        raise exceptions.NotAuthorized()

    if payload.is_finished:
        payload.finished_at = datetime.utcnow()
    updated_task_data = jsonable_encoder(task)
    update_data = {
        **updated_task_data,
        **payload.dict(exclude_unset=True, exclude={"id", "user_id"}),
    }
    updated_user = crud.task.update(db, db_obj=task, obj_in=update_data)
    return updated_user


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(
    id: int,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_user),
):
    """Remove a specific task."""
    task = crud.task.get(db, id=id)
    if task is None:
        raise exceptions.ResourceNotFound(resource_type="Task", id=id)
    if not crud.user.is_admin(current_user) and (task.user_id != current_user.id):
        raise exceptions.NotAuthorized()
    task = crud.task.remove(db, id=id)
    return task

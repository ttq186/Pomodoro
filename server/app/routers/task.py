from typing import List
from fastapi import status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session

from ..models import Task
from ..db import get_db
from ..schemas import TaskIn, TaskOut, TaskUpdate
from ..oauth2 import get_current_user


router = APIRouter(prefix="/api/tasks", tags=["Tasks"])


@router.get("/", response_model=List[TaskOut])
async def get_tasks(
    db: Session = Depends(get_db), current_user=Depends(get_current_user)
):
    tasks_query = db.query(Task).filter_by(user_id=current_user.id).all()
    if not tasks_query:
        return []

    return tasks_query


@router.get("/{id}", response_model=TaskOut)
async def get_task(
    id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)
):
    task_query = db.query(Task).filter_by(id=id, user_id=current_user.id).first()

    if task_query is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"Task with id {id} not found"
        )

    return task_query


@router.post("/", response_model=TaskOut)
async def create_task(
    task_in: TaskIn,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    new_task = Task(**task_in.dict(), user_id=current_user.id)

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task


@router.put("/{id}", response_model=TaskOut)
async def update_task(
    id: int,
    payload: TaskUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    task_query_stmt = db.query(Task).filter_by(id=id, user_id=current_user.id)
    updated_task = task_query_stmt.first()

    if updated_task is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"Task with id {id} not found"
        )
    task_query_stmt.update(payload.dict(exclude_unset=True))
    db.commit()
    db.refresh(updated_task)
    return updated_task


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(
    id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)
):
    deleted_task = db.query(Task).filter_by(id=id, user_id=current_user.id).first()

    if deleted_task is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"Task with id {id} not found"
        )

    db.delete(deleted_task)
    db.commit()

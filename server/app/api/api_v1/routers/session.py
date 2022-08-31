from datetime import datetime
from typing import List, Optional

from fastapi import APIRouter, Depends, status
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app import crud, exceptions, models, schemas
from app.api.api_v1 import deps

router = APIRouter(prefix="/api/sessions", tags=["Sessions"])


@router.get("", response_model=List[schemas.SessionOut])
async def get_sessions(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: Optional[int] = None,
    current_user: models.User = Depends(deps.get_current_user),
):
    """Retrieve sessions by role."""
    if crud.user.is_admin(current_user):
        sessions = crud.session.get_multi(db, skip=skip, limit=limit)
    else:
        sessions = crud.session.get_multi_by_owner(
            db, owner_id=current_user.id, skip=skip, limit=limit
        )
    return sessions


@router.get("/{id}", response_model=schemas.SessionOut)
async def get_session(
    id: int,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_user),
):
    """Retrieve a specific session."""
    session = crud.session.get(db, id=id)
    if session is None:
        raise exceptions.ResourceNotFound(resource_type="Session", id=id)
    if not crud.user.is_admin(current_user) and (session.user_id != current_user.id):
        raise exceptions.NotAuthorized()
    return session


@router.post("", response_model=schemas.SessionOut)
async def create_session(
    session_in: schemas.SessionCreate,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_user),
):
    """Create a new session."""
    session_in.user_id = current_user.id
    session_in.finished_at = datetime.utcnow()
    new_session = crud.session.create(db, obj_in=session_in)
    return new_session


@router.put("/{id}", response_model=schemas.SessionOut)
async def update_session(
    id: int,
    payload: schemas.SessionUpdate,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_superuser),
):
    """Update a specific session."""
    session = crud.session.get(db, id=id)
    if session is None:
        raise exceptions.ResourceNotFound(resource_type="Session", id=id)
    updated_session_data = jsonable_encoder(session)
    update_data = {
        **updated_session_data,
        **payload.dict(exclude_unset=True, exclude={"id", "user_id"}),
    }
    updated_session = crud.session.update(db, db_obj=session, obj_in=update_data)
    return updated_session


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(
    id: int,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_superuser),
):
    """Delete a specific session."""
    session = crud.session.get(db, id=id)
    if session is None:
        raise exceptions.ResourceNotFound(resource_type="Session", id=id)
    session = crud.session.remove(db, id=id)
    return session

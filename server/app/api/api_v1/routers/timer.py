from typing import List

from fastapi import status, HTTPException, Depends, APIRouter
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api.api_v1 import deps


router = APIRouter(prefix="/api/timers", tags=["Timers"])


@router.get("/", response_model=List[schemas.TimerOut])
async def get_timers(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_superuser),
):
    """Retrieve timers."""
    timers = crud.timer.get_multi(db, skip=skip, limit=limit)
    if len(timers) == 0:
        raise HTTPException(
            status_code=status.HTTP_200_OK, detail="There aren't any timers."
        )
    return timers


@router.get("/{id}", response_model=schemas.TimerOut)
async def get_timer(
    id: str,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_user),
):
    """Retrieve a specific timer."""

    timer = crud.timer.get(db, id=id)
    if timer is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Timer with id {id} not found",
        )
    if not crud.user.is_admin(current_user) and (timer.user_id != current_user.id):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="You don't have this privilege.",
        )
    return timer


@router.put("/{id}", response_model=schemas.TimerOut)
async def update_timer(
    payload: schemas.TimerUpdate,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_user),
):
    timer = crud.timer.get(db, id=id)
    if timer is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Timer with id {id} not found.",
        )
    if not crud.user.is_admin(current_user) and (timer.user_id != current_user.id):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="You don't have this privilege.",
        )
    timer_data = jsonable_encoder(timer)
    update_data = {**timer_data, **payload.dict(exclude_unset=True, exclude={"id"})}
    timer_in = schemas.TimerUpdate(**update_data)
    updated_timer = crud.timer.update(db, db_obj=timer, obj_in=timer_in)
    return updated_timer

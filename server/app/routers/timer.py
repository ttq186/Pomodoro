from fastapi import status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session

from ..models import Timer
from ..db import get_db
from ..schemas import TimerBase
from ..oauth2 import get_current_user


router = APIRouter(prefix="/api/timers", tags=["Timers"])


@router.get("/", response_model=TimerBase)
def get_timer(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    timer_query = db.query(Timer).filter_by(user_id=current_user.id).first()

    if timer_query is None:
        return {"user_id": current_user.id}

    return timer_query


@router.put("/", response_model=TimerBase)
def update_timer(
    payload: TimerBase,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    timer_query_stmt = db.query(Timer).filter_by(user_id=current_user.id)
    updated_timer = timer_query_stmt.first()

    if updated_timer is None:
        new_timer = Timer(**payload.dict())
        new_timer.user_id = current_user.id
        db.add(new_timer)
        db.commit()
        db.refresh(new_timer)
        return new_timer

    if not payload.dict(exclude_unset=True):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid update data"
        )

    timer_query_stmt.update(payload.dict(exclude_unset=True))
    db.commit()
    db.refresh(updated_timer)
    return updated_timer

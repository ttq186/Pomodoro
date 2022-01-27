from fastapi import status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session

from ..models import Summary
from ..db import get_db
from ..schemas import SummaryBase
from ..oauth2 import get_current_user


router = APIRouter(prefix="/api/summary", tags=["Summary"])


@router.get("/", response_model=SummaryBase)
def get_timer(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    summary_query = db.query(Summary).filter_by(user_id=current_user.id).first()

    if summary_query is None:
        return {"user_id": current_user.id}

    return summary_query


@router.put("/", response_model=SummaryBase)
def update_timer(
    payload: SummaryBase,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    summary_query_stmt = db.query(Summary).filter_by(user_id=current_user.id)
    updated_summary = summary_query_stmt.first()

    if updated_summary is None:
        print(payload.dict())
        new_summary = Summary(**payload.dict())
        new_summary.user_id = current_user.id
        db.add(new_summary)
        db.commit()
        db.refresh(new_summary)
        return new_summary

    if not payload.dict(exclude_unset=True):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid update data"
        )
    summary_query_stmt.update(payload.dict(exclude_unset=True))
    db.commit()
    db.refresh(updated_summary)
    return updated_summary

from typing import List, Optional

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models import Session as SessionModel
from app.schemas import SessionCreate, SessionUpdate


class CRUDSession(CRUDBase[SessionModel, SessionCreate, SessionUpdate]):
    def get_multi_by_owner(
        self,
        db: Session,
        owner_id: str,
        from_date: str,
        to_date: str,
        skip: int = 0,
        limit: Optional[int] = None,
    ) -> List[SessionModel]:
        sessions = (
            db.query(SessionModel)
            .filter(SessionModel.user_id == owner_id)
            .filter(
                (SessionModel.finished_at >= from_date)
                & (SessionModel.finished_at <= to_date),
            )
            .offset(skip)
            .limit(limit)
            .all()
        )
        return sessions


session = CRUDSession(SessionModel)

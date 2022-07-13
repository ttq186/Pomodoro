from typing import List, Optional

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models import Session as SessionModel
from app.schemas import SessionCreate, SessionUpdate


class CRUDSession(CRUDBase[SessionModel, SessionCreate, SessionUpdate]):
    def get_multi_by_owner(
        self, db: Session, *, owner_id: str, skip: int = 0, limit: Optional[int] = None
    ) -> List[SessionModel]:
        sessions = (
            db.query(SessionModel)
            .filter_by(user_id=owner_id)
            .offset(skip)
            .limit(limit)
            .all()
        )
        return sessions


session = CRUDSession(SessionModel)

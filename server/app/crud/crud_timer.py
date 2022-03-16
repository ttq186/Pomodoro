from typing import Optional

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models import Timer
from app.schemas import TimerCreate, TimerUpdate


class CRUDTimer(CRUDBase[Timer, TimerCreate, TimerUpdate]):
    def get_by_owner(self, db: Session, owner_id: str) -> Optional[Timer]:
        return db.query(Timer).filter_by(user_id=owner_id).first()


timer = CRUDTimer(Timer)

from typing import Optional

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models import Summary
from app.schemas import SummaryCreate, SummaryUpdate


class CRUDSummary(CRUDBase[Summary, SummaryCreate, SummaryUpdate]):
    def get_by_owner(self, db: Session, owner_id: str) -> Optional[Summary]:
        return db.query(Summary).filter_by(user_id=owner_id)


summary = CRUDSummary(Summary)

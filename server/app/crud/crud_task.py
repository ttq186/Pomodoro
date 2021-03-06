from typing import List, Optional

from sqlalchemy import desc
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models import Task
from app.schemas import TaskCreate, TaskUpdate


class CRUDTask(CRUDBase[Task, TaskCreate, TaskUpdate]):
    def get_multi_by_owner(
        self, db: Session, *, owner_id: str, skip: int = 0, limit: Optional[int] = None
    ) -> List[Task]:
        tasks = (
            db.query(Task)
            .filter_by(user_id=owner_id)
            .order_by(desc(Task.created_at))
            .offset(skip)
            .limit(limit)
            .all()
        )
        return tasks


task = CRUDTask(Task)

from typing import List

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models import Task
from app.schemas import TaskCreate, TaskUpdate


class CRUDTask(CRUDBase[Task, TaskCreate, TaskUpdate]):
    def get_multi_by_owner(
        self, db: Session, *, owner_id: str, skip: int, limit: int
    ) -> List[Task]:
        return db.query(Task).filter_by(user_id=owner_id).all()


task = CRUDTask(Task)

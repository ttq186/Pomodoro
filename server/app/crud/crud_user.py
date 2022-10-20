from typing import Any, Dict, List, Optional, Union

from sqlalchemy import desc, func, text
from sqlalchemy.orm import Session

from app.core.security import get_hashed_password
from app.crud.base import CRUDBase
from app.models import Session as SessionModel
from app.models import User
from app.schemas import UserCreate, UserUpdate


class CRUDUser(CRUDBase[User, UserCreate, UserUpdate]):
    def get_by_email(self, db: Session, *, email: str) -> Optional[User]:
        return db.query(User).filter_by(email=email).first()

    def get_multi(
        self,
        db: Session,
        *,
        skip: int = 0,
        limit: Optional[int] = None,
        is_ranking: bool = False,
        is_admin: bool = False
    ) -> List[User]:
        if is_admin:
            users = db.query(User).offset(skip).limit(limit).all()
            return users
        if not is_ranking:
            users = (
                db.query(User).filter_by(is_admin=False).offset(skip).limit(limit).all()
            )
            return users

        sub_query_stmt = (
            db.query(
                SessionModel.user_id,
                func.sum(SessionModel.length).label("total_time_this_week"),
            )
            .filter(SessionModel.finished_at >= text("date_trunc('week', now())"))
            .filter(
                SessionModel.finished_at
                < text("date_trunc('week', now() + interval '1 week')")
            )
            .group_by(SessionModel.user_id)
            .subquery()
        )
        users = (
            db.query(User)
            .join(sub_query_stmt, User.id == sub_query_stmt.c.user_id)
            .filter(User.is_admin == False)  # noqa
            .order_by(desc(sub_query_stmt.c.total_time_this_week))
            .offset(skip)
            .limit(limit)
            .all()
        )
        return users

    def create(self, db: Session, *, obj_in: UserCreate) -> User:
        new_user_data = obj_in.dict()
        if obj_in.password is not None:
            new_user_data["password"] = get_hashed_password(new_user_data["password"])
        db_obj = User(**new_user_data)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self, db: Session, *, db_obj: User, obj_in: Union[UserUpdate, Dict[str, Any]]
    ) -> User:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)

        if update_data.get("password") is not None:
            hashed_password = get_hashed_password(update_data["password"])
            update_data["password"] = hashed_password
        return super().update(db, db_obj=db_obj, obj_in=update_data)

    def is_admin(self, user: User) -> bool:
        return user.is_admin


user = CRUDUser(User)

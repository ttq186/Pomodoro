from sqlalchemy import Boolean, Column, DateTime, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app import utils
from app.db.base_class import Base


class User(Base):
    id = Column(String, primary_key=True, default=utils.generate_uuid())
    username = Column(String)
    email = Column(String, nullable=False)
    password = Column(String)
    is_admin = Column(Boolean, default=False)
    created_at = Column(
        DateTime(timezone=True), nullable=False, server_default=func.now()
    )

    tasks = relationship("Task", back_populates="user")
    sessions = relationship("Session", back_populates="user")
    timer = relationship("Timer", back_populates="user", uselist=False)

    @property
    def total_time_this_week(self) -> int:
        return sum(
            session.length
            for session in self.sessions
            if utils.is_in_curr_week(session.finished_at)
        )

    @property
    def total_time(self) -> int:
        return sum(session.length for session in self.sessions)

    @property
    def total_finished_tasks(self) -> int:
        return sum(1 for task in self.tasks if task.target == task.progress)

    @property
    def total_sessions(self) -> int:
        return len(self.sessions)

    @property
    def total_time_today(self) -> int:
        return sum(
            session.length
            for session in self.sessions
            if utils.is_in_today(session.finished_at)
        )

    @property
    def total_sessions_today(self) -> int:
        return sum(
            1 for session in self.sessions if utils.is_in_today(session.finished_at)
        )

    @property
    def total_finished_tasks_today(self) -> int:
        return sum(1 for task in self.tasks if utils.is_in_today(task.finished_at))

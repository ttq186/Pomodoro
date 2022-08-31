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
        result = 0
        for session in self.sessions:
            if utils.is_in_curr_week(session.finished_at):
                result += session.length
        return result

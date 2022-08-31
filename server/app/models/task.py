from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.base_class import Base


class Task(Base):
    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    notes = Column(String)
    is_finished = Column(Boolean, default=False)
    progress = Column(Integer, nullable=False, default=0)
    target = Column(Integer, nullable=False)
    created_at = Column(
        DateTime(timezone=True), nullable=False, server_default=func.now()
    )
    finished_at = Column(DateTime(timezone=True))
    user_id = Column(String, ForeignKey("user.id", ondelete="CASCADE"), nullable=False)

    user = relationship("User", back_populates="tasks")
    sessions = relationship("Session", back_populates="task")

    @property
    def total_time(self) -> int:
        result = 0
        for session in self.sessions:
            result += session.length
        return result

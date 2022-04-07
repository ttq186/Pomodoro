from sqlalchemy import Column, Integer, DateTime, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.base_class import Base


class Session(Base):
    id = Column(Integer, primary_key=True)
    length = Column(Integer, default=0, nullable=False)
    finished_at = Column(
        DateTime(timezone=True), nullable=False, server_default=func.now()
    )
    user_id = Column(String, ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
    task_id = Column(Integer, ForeignKey("task.id"))

    user = relationship("User", back_populates="sessions")
    task = relationship("Task", back_populates="sessions")

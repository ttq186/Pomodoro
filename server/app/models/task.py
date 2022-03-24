from sqlalchemy import Column, String, Integer, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.base_class import Base


class Task(Base):
    id = Column(Integer, primary_key=True)
    user_id = Column(String, ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
    title = Column(String, nullable=False)
    notes = Column(String)
    is_finished = Column(Boolean, default=False)
    progress = Column(Integer, nullable=False, default=0)
    target = Column(Integer, nullable=False)
    created_at = Column(
        DateTime(timezone=True), nullable=False, server_default=func.now()
    )
    finished_at = Column(DateTime(timezone=True))

    user = relationship("User", back_populates="tasks")

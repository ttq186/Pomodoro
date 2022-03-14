from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship

from ..db.base_class import Base


class Summary(Base):
    id = Column(Integer, primary_key=True)
    user_id = Column(
        String, ForeignKey("user.id", ondelete="CASCADE"), nullable=False
    )
    total_time = Column(Integer, default=0)
    total_sessions = Column(Integer, default=0)
    total_finished_tasks = Column(Integer, default=0)

    user = relationship("User", back_populates="summary")

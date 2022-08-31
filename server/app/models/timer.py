from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class Timer(Base):
    id = Column(Integer, primary_key=True)
    session_time = Column(Integer, default=1500)
    short_break_time = Column(Integer, default=300)
    long_break_time = Column(Integer, default=1200)
    long_break_interval = Column(Integer, default=4)
    alarm_sound = Column(String, default="Digital")
    ticking_sound = Column(String, default="None")
    user_id = Column(String, ForeignKey("user.id", ondelete="CASCADE"), nullable=False)

    user = relationship("User", back_populates="timer")

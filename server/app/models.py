from sqlalchemy import Column, String, Integer, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from .db import Base
from .utils import generate_uuid


class User(Base):
    __tablename__ = "user"

    id = Column(String, primary_key=True, default=generate_uuid())
    username = Column(String)
    email = Column(String, nullable=False)
    password = Column(String, nullable=False)
    is_admin = Column(Boolean, default=False)
    created_at = Column(
        DateTime(timezone=True), nullable=False, server_default=func.now()
    )

    tasks = relationship("Task", back_populates="user")
    timer = relationship("Timer", back_populates="user", uselist=False)
    summary = relationship("Summary", back_populates="user", uselist=False)


class Task(Base):
    __tablename__ = "task"

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

    user = relationship("User", back_populates="tasks")


class Timer(Base):
    __tablename__ = "timer"

    id = Column(Integer, primary_key=True)
    user_id = Column(String, ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
    session_time = Column(Integer, default=1500)
    short_break_time = Column(Integer, default=300)
    long_break_time = Column(Integer, default=1200)
    alarm_sound = Column(String, default="Digital")
    ticking_sound = Column(String, default="None")

    user = relationship("User", back_populates="timer")


class Summary(Base):
    __tablename__ = "summary"

    id = Column(Integer, primary_key=True)
    user_id = Column(String, ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
    total_time = Column(Integer, default=0)
    total_sessions = Column(Integer, default=0)
    total_finished_tasks = Column(Integer, default=0)

    user = relationship("User", back_populates="summary")

from datetime import datetime
from enum import Enum
from typing import Optional

from pydantic import EmailStr, Field
from fastapi_camelcase import CamelModel as BaseModel


# User Schemas
class UserBase(BaseModel):
    email: EmailStr


class UserIn(UserBase):
    password: str


class UserOut(UserBase):
    username: Optional[str] = None
    id: str
    created_at: datetime
    is_admin: bool

    class Config:
        orm_mode = True


class UserUpdate(BaseModel):
    username: Optional[str] = None
    password: Optional[str] = None


# Task Schemas
class TaskBase(BaseModel):
    title: str
    notes: Optional[str]
    target: int = Field(gt=0, le=1000)


class TaskIn(TaskBase):
    pass


class TaskOut(TaskBase):
    id: int
    is_finished: bool 
    progress: int = Field(ge=0)
    user_id: str 
    created_at: datetime 

    class Config:
        orm_mode = True


class TaskUpdate(BaseModel):
    title: Optional[str]
    notes: Optional[str]
    progress: Optional[int] = Field(ge=0)
    target: Optional[int] = Field(gt=0, le=1000)
    is_finished: Optional[bool]


# Token Schemas
class TokenOut(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    id: Optional[str] = None


# Timer Schemas
class AlarmSoundEnum(str, Enum):
    bell = "Bell"
    digital = "Digital"
    door_bell = "Door Bell"
    kitchen = "Kitchen"


class TickingSoundEnum(str, Enum):
    none = "None"
    fast = "Fast"
    slow = "Slow"


class TimerBase(BaseModel):
    session_time: Optional[int] = Field(default=1500, gt=0, le=3600)
    short_break_time: Optional[int] = Field(default=300, gt=0, le=1200)
    long_break_time: Optional[int] = Field(default=1200, gt=0, le=2400)
    long_break_interval: Optional[int] = Field(default=4, gt=0, le=10)
    alarm_sound: AlarmSoundEnum = Field(default="Digital")
    ticking_sound: TickingSoundEnum = Field(default="None")
    user_id: Optional[str]

    class Config:
        orm_mode = True


# Summary Schemas
class SummaryBase(BaseModel):
    total_time: Optional[int] = Field(default=0, ge=0)
    total_sessions: Optional[int] = Field(default=0, ge=0)
    total_finished_tasks: Optional[int] = Field(default=0, ge=0)
    user_id: Optional[str]

    class Config:
        orm_mode = True

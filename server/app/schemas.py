from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, EmailStr, Field


class UserBase(BaseModel):
    email: EmailStr


class UserIn(UserBase):
    password: str


class UserOut(UserBase):
    id: str
    created_at: datetime
    is_admin: bool

    class Config:
        orm_mode = True


class TaskBase(BaseModel):
    title: str
    notes: Optional[str]
    target: int = Field(gt=0)


class TaskIn(TaskBase):
    pass


class TaskOut(TaskBase):
    id: int
    is_finished: bool
    progress: int = Field(ge=0)
    user_id: UUID
    created_at: datetime

    class Config:
        orm_mode = True


class TaskUpdate(BaseModel):
    title: Optional[str]
    notes: Optional[str]
    progress: Optional[int] = Field(ge=0)
    target: Optional[int] = Field(gt=0)
    is_finished: Optional[bool]


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    id: Optional[str] = None
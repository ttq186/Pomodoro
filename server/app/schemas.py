from datetime import datetime

from pydantic import BaseModel, EmailStr


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

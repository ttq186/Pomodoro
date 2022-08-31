from datetime import datetime
from typing import Optional

from fastapi_camelcase import CamelModel as BaseModel
from pydantic import EmailStr, Field


class UserBase(BaseModel):
    """Shared Properties."""

    id: Optional[str] = None
    email: Optional[EmailStr] = None
    username: Optional[str] = None
    created_at: Optional[datetime] = None
    is_admin: bool = False


class UserCreate(UserBase):
    """Properties to receive via Create endpoint."""

    email: EmailStr
    password: Optional[str] = None


class UserUpdate(UserBase):
    """Properties to receive via Update endpoint."""

    password: Optional[str] = None


class UserOut(UserBase):
    """Properties to return to client."""

    total_time_this_week: Optional[int] = Field(ge=0, default=0)

    class Config:
        orm_mode = True

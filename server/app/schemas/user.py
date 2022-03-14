from datetime import datetime
from typing import Optional

from pydantic import EmailStr
from fastapi_camelcase import CamelModel as BaseModel


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
    password: str


class UserUpdate(UserBase):
    """Properties to receive via Update endpoint."""

    password: Optional[str] = None


class UserInDbBase(UserBase):
    class Config:
        orm_mode = True


class UserInDb(UserInDbBase):
    """Additional properties stored in DB."""

    password: str


class UserOut(UserInDbBase):
    """Properties to return to client."""

    pass

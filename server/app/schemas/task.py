from datetime import datetime
from typing import Optional

from pydantic import Field
from fastapi_camelcase import CamelModel as BaseModel


class TaskBase(BaseModel):
    """Shared properties."""

    id: Optional[int] = None
    title: Optional[str] = None
    notes: Optional[str] = None
    is_finished: Optional[bool] = False
    progress: Optional[int] = Field(ge=0)
    target: Optional[int] = Field(gt=0)
    created_at: Optional[datetime] = None
    finished_at: Optional[datetime] = None
    user_id: Optional[str] = None


class TaskCreate(TaskBase):
    """Properties to receive via Create endpoint."""

    title: str
    target: int = Field(gt=0)


class TaskUpdate(TaskBase):
    """Properties to receive via Update endpoint."""

    pass


class TaskInDbBase(TaskBase):
    class Config:
        orm_mode = True


class TaskInDb(TaskInDbBase):
    pass


class TaskOut(TaskInDbBase):
    """Properties to return to client."""

    pass

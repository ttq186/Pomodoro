from datetime import datetime
from typing import Optional

from fastapi_camelcase import CamelModel as BaseModel
from pydantic import Field


class SessionBase(BaseModel):
    """Shared properties."""

    id: Optional[int]
    length: Optional[int] = Field(gt=0)
    finished_at: Optional[datetime] = None
    task_id: Optional[int] = None
    user_id: Optional[str]


class SessionCreate(SessionBase):
    """Properties to receive via Create endpoint."""

    pass


class SessionUpdate(SessionBase):
    """Properties to receive via Update endpoint."""

    pass


class SessionOut(SessionBase):
    """Properties to return to client."""

    class Config:
        orm_mode = True

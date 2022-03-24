from datetime import datetime
from typing import Optional

from pydantic import Field
from fastapi_camelcase import CamelModel as BaseModel


class SessionBase(BaseModel):
    """Shared properties."""

    id: Optional[str]
    length: Optional[int] = Field(ge=0)
    finished_at: Optional[datetime] = None
    user_id: Optional[str]


class SessionCreate(SessionBase):
    """Properties to receive via Create endpoint."""

    pass


class SessionUpdate(SessionBase):
    """Properties to receive via Update endpoint."""

    pass


class SessionInDbBase(SessionBase):
    class Config:
        orm_mode = True


class SessionInDb(SessionInDbBase):
    pass


class SessionOut(SessionInDbBase):
    """Properties to return to client."""

    pass

from typing import Optional

from pydantic import Field
from fastapi_camelcase import CamelModel as BaseModel


class SummaryBase(BaseModel):
    """Shared properties."""

    id: Optional[str]
    total_time: Optional[int] = Field(default=0, ge=0)
    total_sessions: Optional[int] = Field(default=0, ge=0)
    total_finished_tasks: Optional[int] = Field(default=0, ge=0)
    user_id: Optional[str] = None


class SummaryCreate(SummaryBase):
    """Properties to receive via Create endpoint."""

    pass


class SummaryUpdate(SummaryBase):
    """Properties to receive via Update endpoint."""

    pass


class SummaryInDbBase(SummaryBase):
    class Config:
        orm_mode = True


class SummaryInDb(SummaryInDbBase):
    pass


class SummaryOut(SummaryInDbBase):
    """Properties to return to client."""

    pass

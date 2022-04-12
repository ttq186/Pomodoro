from enum import Enum
from typing import Optional

from pydantic import Field
from fastapi_camelcase import CamelModel as BaseModel


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
    """Shared Properties."""

    id: Optional[int]
    session_time: Optional[int] = Field(default=1500, gl=0)
    short_break_time: Optional[int] = Field(default=300, gl=0)
    long_break_time: Optional[int] = Field(default=1200, gl=0)
    long_break_interval: Optional[int] = Field(default=4, gl=0)
    alarm_sound: Optional[AlarmSoundEnum] = Field(AlarmSoundEnum.digital)
    ticking_sound: Optional[TickingSoundEnum] = Field(TickingSoundEnum.none)
    user_id: Optional[str]


class TimerCreate(TimerBase):
    """Properties to receive via Create endpoint."""

    pass


class TimerUpdate(TimerBase):
    """Properties to receive via Update endpoint."""

    pass


class TimerInDbBase(TimerBase):
    class Config:
        orm_mode = True


class TimerInDb(TimerInDbBase):
    """Additional properties stored in DB."""

    pass


class TimerOut(TimerInDbBase):
    """Properties to return to client."""

    pass

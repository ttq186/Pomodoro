from app.crud.base import CRUDBase
from app.models import Timer
from app.schemas import TimerCreate, TimerUpdate


class CRUDTimer(CRUDBase[Timer, TimerCreate, TimerUpdate]):
    pass


timer = CRUDTimer(Timer)

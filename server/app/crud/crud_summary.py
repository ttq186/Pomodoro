from app.crud.base import CRUDBase

from app.models import Summary
from app.schemas import SummaryCreate, SummaryUpdate


class CRUDSummary(CRUDBase[Summary, SummaryCreate, SummaryUpdate]):
    pass


summary = CRUDSummary(Summary)

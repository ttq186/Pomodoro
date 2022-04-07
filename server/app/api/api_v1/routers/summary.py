from typing import List

from fastapi import status, HTTPException, Depends, APIRouter
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app import crud, models, schemas, exceptions
from app.api.api_v1 import deps


router = APIRouter(prefix="/api/summary", tags=["Summary"])


@router.post("/me", response_model=schemas.SummaryOut)
async def create_summary_by_owner(
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_user),
):
    """Create summary by owner."""
    summary = crud.summary.get_by_owner(db, owner_id=current_user.id)
    if summary is not None:
        raise exceptions.ResourceAlreadyExists(resource_type="Summary")
    summary_in = schemas.SummaryInDb()
    print(summary_in)


@router.get("/", response_model=List[schemas.SummaryOut])
async def get_summaries(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_superuser),
):
    """Retrieve summaries."""
    summaries = crud.summary.get_multi(db, skip=skip, limit=limit)
    return summaries


@router.get("/me", response_model=schemas.SummaryOut)
async def get_by_owner(
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_user),
):
    """Retrieve summary by owner."""
    summary = crud.summary.get_by_owner(db, owner_id=current_user.id)
    if summary is None:
        summary_in = schemas.SummaryInDb()
        summary_in.user_id = current_user.id
        summary = crud.summary.create(db, obj_in=summary_in)
    return summary


@router.get("/{id}", response_model=schemas.SummaryOut)
async def get_summary(
    id: str,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_user),
):
    """Retrieve a specific summary."""
    summary = crud.summary.get(db, id=id)
    if summary is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Summary with id {id} not found",
        )
    if not crud.user.is_admin(current_user) and (summary.user_id != current_user.id):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="You don't have this privilege.",
        )
    return summary


@router.put("/me", response_model=schemas.SummaryOut)
async def update_summary_by_owner(
    payload: schemas.SummaryUpdate,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_user),
):
    """Update summary by owner."""
    summary = crud.summary.get_by_owner(db, owner_id=current_user.id)
    if summary is None:
        summary = models.Summary(**schemas.SummaryUpdate().dict())
        summary.user_id = current_user.id

    summary_data = jsonable_encoder(summary)
    update_data = {
        **summary_data,
        **payload.dict(exclude_unset=True, exclude={"id", "user_id"}),
    }
    summary_in = schemas.SummaryUpdate(**update_data)
    updated_summary = crud.summary.update(db, db_obj=summary, obj_in=summary_in)
    return updated_summary


@router.put("/{id}", response_model=schemas.SummaryOut)
async def update_summary(
    payload: schemas.SummaryUpdate,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_user),
):
    """Update a specific summary."""
    summary = crud.summary.get(db, id=id)
    if summary is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Summary with id {id} not found.",
        )
    if not crud.user.is_admin(current_user) and (summary.user_id != current_user.id):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="You don't have this privilege.",
        )
    summary_data = jsonable_encoder(summary)
    update_data = {
        **summary_data,
        **payload.dict(exclude_unset=True, exclude={"id, user_id"}),
    }
    summary_in = schemas.SummaryUpdate(**update_data)
    updated_summary = crud.summary.update(db, db_obj=summary, obj_in=summary_in)
    return updated_summary

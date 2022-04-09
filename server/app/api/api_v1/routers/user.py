from datetime import timedelta
from typing import Any, List

from fastapi import Depends, APIRouter
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from jose import JWTError, jwt

from app import crud, models, schemas, utils, exceptions
from app.api.api_v1 import deps
from app.core import security
from app.core.config import settings


router = APIRouter(prefix="/api/users", tags=["Users"])


@router.get("/me", response_model=schemas.UserOut)
async def get_user_me(
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_user),
):
    """Retrieve the current user."""
    return current_user


@router.get("/", response_model=List[schemas.UserOut])
async def get_users(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 10e6,
    current_user: models.User = Depends(deps.get_current_user),
) -> Any:
    """Retrieve users."""
    users = crud.user.get_multi(
        db, skip=skip, limit=limit, is_admin=crud.user.is_admin(current_user)
    )
    if len(users) == 0:
        raise exceptions.ResourcesNotFound(resource_type="Users")
    return users


@router.get("/{id}", response_model=schemas.UserOut)
async def get_user(
    id: str,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_superuser),
):
    """Retrieve a specific user by id."""
    user = crud.user.get(db, id=id)
    if user is None:
        raise exceptions.ResourceNotFound(resource_type="User", id=id)
    return user


@router.post("/", response_model=schemas.UserOut)
async def create_user(user_in: schemas.UserCreate, db: Session = Depends(deps.get_db)):
    """Create a new user."""
    user = crud.user.get_by_email(db, email=user_in.email)
    if user is not None:
        raise exceptions.EmailAlreadyExists()

    new_user_id = utils.generate_uuid()
    while crud.user.get(db, id=new_user_id) is not None:
        new_user_id = utils.generate_uuid()
    user_in.id = new_user_id
    new_user = crud.user.create(db, obj_in=user_in)
    return new_user


@router.put("/me", response_model=schemas.UserOut)
async def update_user_me(
    payload: schemas.UserUpdate,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_user),
):
    """Update the own user."""
    current_user_data = jsonable_encoder(current_user)
    update_data = {
        **current_user_data,
        **payload.dict(exclude_unset=True, exclude={"id"}),
    }
    user_in = schemas.UserUpdate(**update_data)
    updated_user = crud.user.update(db, db_obj=current_user, obj_in=user_in)
    return updated_user


@router.put("/{id}", response_model=schemas.UserOut)
async def update_user(
    id: str,
    payload: schemas.UserUpdate,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_superuser),
):
    """Update a specific user."""
    user = crud.user.get(db, id=id)
    if user is None:
        raise exceptions.ResourceNotFound(resource_type="User", id=id)

    user_data = jsonable_encoder(user)
    update_data = {**user_data, **payload.dict(exclude_unset=True, exclude={"id"})}
    user_in = schemas.UserUpdate(**update_data)
    updated_user = crud.user.update(db, db_obj=user, obj_in=user_in)
    return updated_user


@router.post("/forgot-password")
async def forgot_password(
    user_in: schemas.UserUpdate, db: Session = Depends(deps.get_db)
):
    """Send reset password email."""
    user = crud.user.get_by_email(db, email=user_in.email)
    if user is None:
        raise exceptions.EmailNotExists()
    if user.password is None:
        raise exceptions.AccountCreatedByGoogle()

    to_encode = {"id": user.id}
    JWT_SECRET_KEY = settings.SECRET_KEY + user.password
    reset_token = security.create_access_token(to_encode, timedelta(15), JWT_SECRET_KEY)
    reset_link = f"""{settings.PASSWORD_RESET_BASE_URL}/reset-password/\
                {user.id}/{reset_token}"""
    utils.send_reset_password_email(user.email, reset_link)
    return {"detail": "Password reset requests successfully!"}


@router.post("/reset-password/{id}/{token}")
async def reset_password(
    id: str,
    token: str,
    user_in: schemas.UserUpdate,
    db: Session = Depends(deps.get_db),
):
    """Reset password."""
    user = crud.user.get(db, id=id)
    if user is None:
        raise exceptions.ResetLinkExpired()
    try:
        JWT_SECRET_KEY = settings.SECRET_KEY + user.password
        jwt.decode(token, JWT_SECRET_KEY, algorithms=[settings.ALGORITHM])

        if user_in.password is not None:
            crud.user.update(db, db_obj=models.User, obj_in=user_in)
        return {"detail": "Reset password successfully!"}

    except JWTError:
        raise exceptions.ResetLinkExpired()

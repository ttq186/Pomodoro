from datetime import timedelta
from typing import List
from fastapi import status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from jose import JWTError, jwt

from ..models import User
from ..db import get_db
from ..schemas import UserIn, UserOut, UserUpdate, UserBase
from ..utils import get_hashed_password, generate_uuid
from ..oauth2 import SECRET_KEY, create_access_token, get_current_user
from ..email_service import send_reset_email
from ..config import settings

router = APIRouter(prefix="/api/users", tags=["Users"])


@router.get("/", response_model=List[UserOut])
async def get_users(
    db: Session = Depends(get_db), current_user=Depends(get_current_user)
):
    if not current_user.is_admin:
        return [current_user]

    users_query = db.query(User).all()
    if not users_query:
        raise HTTPException(
            status_code=status.HTTP_200_OK, detail=f"There aren't any users"
        )

    return users_query


@router.get("/{id}", response_model=UserOut)
async def get_user(
    id: str,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have this privilege",
        )

    user_query = db.query(User).filter_by(id=id).first()
    if user_query is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id {id} not found",
        )

    return user_query


@router.post("/", response_model=UserOut)
async def create_user(user_in: UserIn, db: Session = Depends(get_db)):
    user_query = db.query(User).filter_by(email=user_in.email).first()

    if user_query is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already exists.",
        )

    hashed_password = get_hashed_password(user_in.password)
    user_dict = user_in.dict()
    user_dict["password"] = hashed_password

    new_user_id = generate_uuid()
    while db.query(User).filter_by(id=new_user_id).first() is not None:
        new_user_id = generate_uuid()
    user_dict["id"] = new_user_id
    new_user = User(**user_dict)

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


@router.put("/", response_model=UserOut)
async def update_user(
    payload: UserUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    user_query_stmt = db.query(User).filter_by(id=current_user.id)
    updated_user = user_query_stmt.first()

    if payload.username is not None:
        user_query_stmt.update({"username": payload.username})

    if payload.password is not None:
        new_hashed_password = get_hashed_password(payload.password)
        user_query_stmt.update({"password": new_hashed_password})

    db.commit()
    db.refresh(updated_user)

    return updated_user


@router.post("/forgot-password")
async def forgot_password(payload: UserBase, db: Session = Depends(get_db)):
    user_query = db.query(User).filter_by(email=payload.email).first()

    if user_query is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="This email does not exist. Try again!",
        )
    print(user_query.password)
    if user_query.password is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Looks like this account has been created by Google sign in method. Try again!",
        )

    to_encode = {"id": user_query.id}
    JWT_SECRET_KEY = SECRET_KEY + user_query.password
    reset_token = create_access_token(to_encode, timedelta(15), JWT_SECRET_KEY)
    reset_link = f"{settings.PASSWORD_RESET_BASE_URL}/reset-password/{user_query.id}/{reset_token}"
    send_reset_email(user_query.email, reset_link)

    return {"detail": "Password reset requests successfully!"}


@router.post("/reset-password/{id}/{token}")
async def reset_password(
    id: str, token: str, payload: UserUpdate, db: Session = Depends(get_db)
):
    user_query_stmt = db.query(User).filter_by(id=id)
    user_query = user_query_stmt.first()
    expired_exception = HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="This reset link has expired. Try again!",
    )
    if user_query is None:
        raise expired_exception

    try:
        JWT_SECRET_KEY = SECRET_KEY + user_query.password
        jwt.decode(token, JWT_SECRET_KEY, algorithms=["HS256"])

        if payload.password is not None:
            new_hashed_password = get_hashed_password(payload.password)
            user_query_stmt.update({"password": new_hashed_password})
            db.commit()
            db.refresh(user_query)
        return {"detail": "Reset password successfully!"}

    except JWTError:
        raise expired_exception

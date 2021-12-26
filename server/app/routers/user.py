from typing import List
from fastapi import status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session

from ..models import User
from ..db import get_db
from ..schemas import UserIn, UserOut, UserUpdate
from ..utils import get_hashed_password, generate_uuid
from ..oauth2 import get_current_user


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
    id: str, db: Session = Depends(get_db), current_user=Depends(get_current_user)
):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have this privilege",
        )

    user_query = db.query(User).filter_by(id=id).first()
    if user_query is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"User with id {id} not found"
        )

    return user_query


@router.post("/", response_model=UserOut)
async def create_user(user_in: UserIn, db: Session = Depends(get_db)):
    user_query = db.query(User).filter_by(email=user_in.email).first()

    if user_query is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Email already exists."
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

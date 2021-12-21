from typing import List
from fastapi import status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session

from ..models import User
from ..db import get_db
from ..schemas import UserIn, UserOut
from ..utils import get_hashed_password


router = APIRouter(prefix="/api/users", tags=["Users"])


@router.get("/", response_model=List[UserOut])
async def get_users(db: Session = Depends(get_db)):
    users_query = db.query(User).filter_by(is_admin=False).all()

    if not users_query:
        raise HTTPException(
            status_code=status.HTTP_200_OK, detail=f"There aren't any users"
        )
    
    return users_query


@router.get("/{id}", response_model=UserOut)
async def get_user(id: str, db: Session = Depends(get_db)):
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
    new_user = User(**user_dict)

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

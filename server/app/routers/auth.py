from fastapi import Depends, APIRouter, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from ..schemas import Token
from ..models import User
from ..utils import verify_password
from ..db import get_db
from ..oauth2 import create_access_token


router = APIRouter(prefix="/login", tags=["Authentication"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")


@router.post("/", response_model=Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    user = db.query(User).filter_by(email=form_data.username).first()
    credentials_exception = HTTPException(
        status_code=status.HTTP_403_FORBIDDEN, detail="Invalid Credentials"
    )

    if user is None:
        raise credentials_exception

    if not verify_password(form_data.password, user.password):
        raise credentials_exception

    access_token = create_access_token(data={"user_id": user.id})
    return {"access_token": access_token, "token_type": "bearer"}

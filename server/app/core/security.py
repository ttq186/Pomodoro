from datetime import datetime, timedelta
from typing import Optional

from jose import jwt
from passlib.context import CryptContext

from app.core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def create_token(
    data: dict,
    expires_delta: Optional[timedelta] = None,
    JWT_SECRET_KEY: Optional[str] = None,
):
    expire = datetime.utcnow() + (
        expires_delta or timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    data.update({"exp": expire})
    encoded_jwt = jwt.encode(
        data, JWT_SECRET_KEY or settings.SECRET_KEY, algorithm=settings.ALGORITHM
    )
    return encoded_jwt


def get_hashed_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_pwd: str, hashed_pwd: str) -> bool:
    return pwd_context.verify(plain_pwd, hashed_pwd)

from datetime import timedelta

from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from jose import jwt
from google.auth.transport import requests
from google.oauth2 import id_token
from sqlalchemy.orm import Session

from app import crud, exceptions, schemas, utils
from app.api.v1 import deps
from app.core import security
from app.core.config import settings

router = APIRouter(prefix="/api/auth", tags=["Authentication"])


@router.post("", response_model=schemas.TokenOut)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(deps.get_db),
):
    user = crud.user.get_by_email(db, email=form_data.username)
    if user is None or not security.verify_password(form_data.password, user.password):
        raise exceptions.IncorrectLoginCredentials()
    access_token = security.create_token(data={"user_id": user.id})
    refresh_token = security.create_token(
        data={"user_id": user.id},
        expires_delta=timedelta(settings.REFRESH_TOKEN_EXPIRE_MINUTES),
        JWT_SECRET_KEY=settings.REFRESH_SECRET_KEY,
    )
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "login_type": "normal",
    }


@router.post("/google", response_model=schemas.TokenOut)
def login_via_google(payload: schemas.GoogleToken, db: Session = Depends(deps.get_db)):
    request = requests.Request()
    user_data = id_token.verify_oauth2_token(
        payload.token_id, request, settings.GOOGLE_CLIENT_ID
    )
    user_id: str = None
    user = crud.user.get_by_email(db, email=user_data.get("email"))

    # if email does not exist, create a new user with empty password
    if user is None:
        # avoid duplicating user id
        user_id = utils.generate_uuid()
        while crud.user.get(db, id=user_id) is not None:
            user_id = utils.generate_uuid()
        new_user = schemas.UserCreate(id=user_id, email=user_data.get("email"))
        new_user = crud.user.create(db, obj_in=new_user)
    else:
        # raise exception if user attempts to sign in with email that has already been
        # been without signing in by google
        if user.password is not None:
            raise exceptions.AccountCreatedWithOutGoogle()
        user_id = user.id
    access_token = security.create_token(data={"user_id": user_id})
    refresh_token = security.create_token(
        data={"user_id": user_id},
        expires_delta=timedelta(settings.REFRESH_TOKEN_EXPIRE_MINUTES),
        JWT_SECRET_KEY=settings.REFRESH_SECRET_KEY,
    )
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "login_type": "3rd party",
    }


@router.post("/refresh-token", response_model=schemas.TokenOut)
def refresh_access_token(payload: dict):
    refresh_token = payload["refreshToken"]
    user_id = None
    try:
        token_data = jwt.decode(
            token=refresh_token,
            key=settings.REFRESH_SECRET_KEY,
            algorithms=settings.ALGORITHM,
        )
        user_id = token_data["user_id"]
    except Exception:
        raise exceptions.InvalidRefreshToken()

    new_access_token = security.create_token(data={"user_id": user_id})
    return {
        "access_token": new_access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
    }

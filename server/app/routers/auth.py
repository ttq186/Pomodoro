from fastapi import Depends, APIRouter, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from google.oauth2 import id_token
from google.auth.transport import requests

from ..schemas import TokenOut, GoogleToken
from ..models import User
from ..utils import verify_password, generate_uuid
from ..db import get_db
from ..oauth2 import create_access_token


router = APIRouter(prefix="/api/login", tags=["Authentication"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")

request = requests.Request()
CLIENT_ID = "518727150893-4c80ip0io9lbbnmbrujki5l8cn4vrvvv.apps.googleusercontent.com"


@router.post("/", response_model=TokenOut)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    user = db.query(User).filter_by(email=form_data.username).first()
    credentials_exception = HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="Incorrect email or password. Try again!",
    )

    if user is None:
        raise credentials_exception

    if not verify_password(form_data.password, user.password):
        raise credentials_exception

    access_token = create_access_token(data={"user_id": user.id})
    return {
        "access_token": access_token,
        "token_type": "bearer",
    }


@router.post("/google", response_model=TokenOut)
async def login_via_google(payload: GoogleToken, db: Session = Depends(get_db)):
    user_data = id_token.verify_oauth2_token(payload.token_id, request, CLIENT_ID)
    user_id = None
    user_query = db.query(User).filter_by(email=user_data["email"]).first()

    # if email does not exist, create a new user with empty password
    if user_query is None:
        new_user_id = generate_uuid()
        while db.query(User).filter_by(id=new_user_id).first() is not None:
            new_user_id = generate_uuid()

        new_user = User(id=new_user_id, email=user_data["email"])
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        user_id = new_user.id
    else:
        # if user attempts to sign in with email that has already been created
        #  without signing in by google, raise error
        if user_query.password is not None:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Looks like an account has been created before without Google sign in method. Try again!",
            )

        user_id = user_query.id
    access_token = create_access_token(data={"user_id": user_id})

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }

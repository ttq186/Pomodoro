from typing import Optional

from fastapi_camelcase import CamelModel as BaseModel


class TokenOut(BaseModel):
    """Properties to return to client."""

    access_token: str
    refresh_token: Optional[str]
    token_type: str
    login_type: Optional[str]


class TokenData(BaseModel):
    id: Optional[str] = None


class GoogleToken(BaseModel):
    token_id: str

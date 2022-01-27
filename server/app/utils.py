from uuid import uuid4
from passlib.context import CryptContext


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def generate_uuid() -> str:
    """Helper function for generating a random uuid."""

    return str(uuid4())


def get_hashed_password(password: str) -> str:
    """Helper function for hashing a plain string."""

    return pwd_context.hash(password)


def verify_password(plain_pwd: str, hashed_pwd: str) -> bool:
    """Helper function for verifying plain text password."""

    return pwd_context.verify(plain_pwd, hashed_pwd)

from pydantic import BaseSettings


class Settings(BaseSettings):
    DB_HOSTNAME: str
    DB_PORT: str
    DB_PASSWORD: str
    DB_NAME: str
    DB_USERNAME: str
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: float
    GOOGLE_CLIENT_ID: str
    SENDGRID_FROM_EMAIL: str
    SENDGRID_TEMPLATE_ID: str
    SENDGRID_API_KEY: str

    class Config:
        env_file = ".env"


settings = Settings()

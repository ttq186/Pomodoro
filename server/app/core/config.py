from pydantic import BaseSettings


class Settings(BaseSettings):
    DB_HOSTNAME: str
    DB_PORT: str
    DB_PASSWORD: str
    DB_NAME: str
    DB_USERNAME: str
    SECRET_KEY: str
    REFRESH_SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    REFRESH_TOKEN_EXPIRE_MINUTES: int
    GOOGLE_CLIENT_ID: str
    SENDGRID_FROM_EMAIL: str
    SENDGRID_TEMPLATE_ID: str
    SENDGRID_API_KEY: str
    PASSWORD_RESET_BASE_URL: str

    class Config:
        env_file = ".env"


settings = Settings()

from fastapi import FastAPI
from .routers import user

app = FastAPI()


@app.get("/")
def home():
    return {"home": "hehe"}


app.include_router(user.router)

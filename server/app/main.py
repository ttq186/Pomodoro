from fastapi import FastAPI
from .routers import user, task, auth

app = FastAPI()


app.include_router(user.router)
app.include_router(task.router)
app.include_router(auth.router)
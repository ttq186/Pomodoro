from fastapi import FastAPI
from .routers import user, task, auth, timer, summary

app = FastAPI()


app.include_router(auth.router)
app.include_router(user.router)
app.include_router(task.router)
app.include_router(timer.router)
app.include_router(summary.router)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import user, task, auth, timer, summary

app = FastAPI()

origins = ["http://localhost", "http://ttq186.xyz", "https://ttq186.xyz", "*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


app.include_router(auth.router)
app.include_router(user.router)
app.include_router(task.router)
app.include_router(timer.router)
app.include_router(summary.router)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.api_v1.routers import user, task, auth, timer, summary

app = FastAPI()

allowed_origins = [
    "http://localhost",
    "http://ttq186.xyz",
    "https://ttq186.xyz",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth.router)
app.include_router(user.router)
app.include_router(task.router)
app.include_router(timer.router)
app.include_router(summary.router)

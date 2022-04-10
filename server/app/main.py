from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.api_v1.routers import user, task, auth, timer, session

app = FastAPI(
    title="Pomodoro App",
    version="1.0.0"
)

allowed_origins = [
    "http://localhost",
    "http://localhost:3000",
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
app.include_router(session.router)

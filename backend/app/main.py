from fastapi import FastAPI
from app.database import Base, engine
from app.routers import bookings, coaches, favorites, user, workouts
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="Gymie Booking API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables in SQLite
Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(user.router)
app.include_router(workouts.router)
app.include_router(coaches.router)
app.include_router(bookings.router)
app.include_router(favorites.router)

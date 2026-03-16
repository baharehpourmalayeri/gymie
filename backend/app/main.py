from fastapi import FastAPI
from app.database import Base, engine
from app.routers import classes, bookings, user


app = FastAPI(title="Gymie Booking API")

# Create tables in SQLite
Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(user.router)
app.include_router(classes.router)
app.include_router(bookings.router)

from fastapi import FastAPI
from app.database import Base, engine
from app.routers import classes, bookings


app = FastAPI(title="Gymie Booking API")

# Create tables in SQLite
Base.metadata.create_all(bind=engine)

# Include routers (we’ll create them next)
app.include_router(classes.router)
app.include_router(bookings.router)

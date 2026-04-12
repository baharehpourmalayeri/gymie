from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.orm import Session
from app.schema.bookings import CoachBookingCreate, WorkoutBookingCreate, WorkoutBookingResponse, CoachBookingResponse
from app.database import get_db
from app.crud import bookings as crud_bookings
from app.utils.auth import verify_token

router = APIRouter(
    prefix="/bookings",
    tags=["bookings"]
)


# Create a new booking
@router.post("/workout", response_model=WorkoutBookingResponse)
def create_workout_booking(booking: WorkoutBookingCreate, token_data: dict = Depends(verify_token), db: Session = Depends(get_db)):
    user_id = int(token_data["user_id"])
    return crud_bookings.create_workout_booking(booking, user_id, db)


@router.post("/coach", response_model=CoachBookingResponse)
def create_coach_booking(booking: CoachBookingCreate, token_data: dict = Depends(verify_token), db: Session = Depends(get_db)):
    user_id = int(token_data["user_id"])
    return crud_bookings.create_coach_booking(booking, user_id, db)


# Delete a booking
@router.delete("/workout/{booking_id}")
def cancel_workout_booking(booking_id: int, token_data: dict = Depends(verify_token), db: Session = Depends(get_db)):
    user_id = int(token_data["user_id"])
    return crud_bookings.cancel_workout_booking(booking_id, user_id, db)


@router.delete("/coach/{booking_id}")
def cancel_coach_booking(booking_id: int, token_data: dict = Depends(verify_token), db: Session = Depends(get_db)):
    user_id = int(token_data["user_id"])
    return crud_bookings.cancel_coach_booking(booking_id, user_id, db)


# Get all bookings for a user
@router.get("/workouts", response_model=List[WorkoutBookingResponse])
def get_user_workout_bookings(token_data: dict = Depends(verify_token), db: Session = Depends(get_db)):
    user_id = int(token_data["user_id"])
    return crud_bookings.get_user_workout_bookings(user_id, db)


@router.get("/coaches", response_model=List[CoachBookingResponse])
def get_user_coach_bookings(token_data: dict = Depends(verify_token), db: Session = Depends(get_db)):
    user_id = int(token_data["user_id"])
    return crud_bookings.get_user_coach_bookings(user_id, db)

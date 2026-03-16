from sqlalchemy.orm import Session
from app.model.classes import GymClass
from app.model.bookings import Booking
from app.schema.bookings import BookingCreate
from fastapi import HTTPException, Depends
from app.database import get_db


def create_booking(booking: BookingCreate, db: Session = Depends(get_db)):
    # Check if class exists
    gym_class = db.query(GymClass).filter(GymClass.id == booking.class_id).first()
    if not gym_class:
        raise HTTPException(status_code=404, detail="Class not found")

    # Check if class is full
    if len(gym_class.bookings) >= gym_class.capacity:
        raise HTTPException(status_code=400, detail="Class is fully booked")

    # Check if user already booked
    existing_booking = db.query(Booking).filter(
        Booking.user_id == booking.user_id,
        Booking.class_id == booking.class_id
    ).first()
    if existing_booking:
        raise HTTPException(status_code=400, detail="You already booked this class")

    #Create booking
    db_booking = Booking(user_id=booking.user_id, class_id=booking.class_id)
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking


def cancel_booking(booking_id: int, db: Session = Depends(get_db)):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    db.delete(booking)
    db.commit()
    return {"detail": "Booking cancelled"}


def get_user_bookings(user_id: int, db: Session = Depends(get_db)):
    bookings = db.query(Booking).filter(Booking.user_id == user_id).all()
    return bookings

from sqlalchemy.orm import Session
from app import schemas
from app.model.classes import GymClass
from app.model.bookings import Booking
from fastapi import HTTPException, Depends
from app.database import get_db



def get_classes(db: Session = Depends(get_db)):
    classes = db.query(GymClass).all()
    result = []
    for c in classes:
        booked_count = len(c.bookings)
        free_spots = c.capacity - booked_count
        is_full = free_spots <= 0

        result.append(
            schemas.GymClassResponse(
                id=c.id,
                name=c.name,
                trainer=c.trainer,
                type=c.training,  # keep same as DB
                datetime=c.datetime,
                capacity=c.capacity,
                image=c.image,
                free_spots=free_spots,
                is_full=is_full
            )
        )
    return result



def get_class(class_id: int, db: Session = Depends(get_db)):
    c = db.query(GymClass).filter(GymClass.id == class_id).first()
    if not c:
        raise HTTPException(status_code=404, detail="Class not found")

    booked_count = len(c.bookings)
    free_spots = c.capacity - booked_count
    is_full = free_spots <= 0

    return schemas.GymClassResponse(
        id=c.id,
        name=c.name,
        trainer=c.trainer,
        type=c.training,  # keep same as DB
        datetime=c.datetime,
        capacity=c.capacity,
        image=c.image,
        free_spots=free_spots,
        is_full=is_full
    )

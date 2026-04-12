from sqlalchemy import func
from sqlalchemy.orm import Session
from app.model.workouts import Workout, WorkoutSession
from app.model.user import Favorite
from app.model.bookings import Booking
from app.schema.workouts import WorkoutBase, WorkoutResponse, WorkoutSessionResponse
from fastapi import HTTPException


def get_workouts(limit: int, filter: str, db: Session, user_id: int | None = None):
    workouts = db.query(Workout)
    if limit > 0:
        workouts = workouts.limit(limit)
    if filter:
        workouts = workouts.filter(func.lower(
            Workout.title).contains(func.lower(filter)))
    workouts = workouts.all()

    favorite_workout_ids: set[int] = set()
    if user_id is not None:
        favorite_workout_ids = {
            workout_id for (workout_id,) in db.query(Favorite.workout_id).filter(
                Favorite.user_id == user_id
            ).all()
        }

    result = []
    for w in workouts:

        result.append(
            WorkoutResponse(
                id=w.id,
                slug=w.slug,
                title=w.title,
                description=w.description,
                longDescription=w.long_description,
                image=w.image,
                isFavorite=w.id in favorite_workout_ids

            )
        )
    return result


def get_workout(slug: str, db: Session, user_id: int | None = None):
    w = db.query(Workout).filter(Workout.slug == slug).first()
    if not w:
        raise HTTPException(status_code=404, detail="Workout not found")

    is_favorite = False
    if user_id is not None:
        is_favorite = db.query(Favorite).filter(
            Favorite.user_id == user_id,
            Favorite.workout_id == w.id,
        ).first() is not None

    return WorkoutResponse(
        id=w.id,
        slug=w.slug,
        title=w.title,
        description=w.description,
        longDescription=w.long_description,
        image=w.image,
        isFavorite=is_favorite
    )


def get_sessions(slug: str, db: Session,  user_id: int | None = None):
    sessions = db.query(WorkoutSession).join(
        Workout).filter(Workout.slug == slug).all()

    booked_session_ids: set[int] = set()
    if user_id is not None:
        booked_session_ids = {
            workout_session_id for (workout_session_id,) in db.query(Booking.workout_session_id).filter(
                Booking.user_id == user_id,
                Booking.workout_session_id != None
            ).all()
        }

    result = []
    for s in sessions:
        result.append(
            WorkoutSessionResponse(
                id=s.id,
                workout=WorkoutBase(
                    id=s.workout.id,
                    slug=s.workout.slug,
                    title=s.workout.title,
                    description=s.workout.description,
                    image=s.workout.image,
                ),
                start=s.start_date,
                end=s.end_date,
                capacity=s.capacity,
                booked=s.booked,
                isBooked=s.id in booked_session_ids
            )
        )
    return result

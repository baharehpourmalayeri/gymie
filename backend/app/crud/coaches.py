from sqlalchemy import func
from sqlalchemy.orm import Session
from app.model.coaches import Coach, CoachSession
from app.model.bookings import Booking
from app.schema.coaches import CoachBase, CoachResponse, CoachSessionResponse
from fastapi import HTTPException


def get_coaches(db: Session):
    coaches = db.query(Coach)

    coaches = coaches.all()
    result = []
    for c in coaches:

        result.append(
            CoachResponse(
                id=c.id,
                slug=c.slug,
                name=c.name,
                title=c.title,
                bio=c.bio,
                image=c.image,
            )
        )
    return result


def get_coach(slug: str, db: Session):
    c = db.query(Coach).filter(Coach.slug == slug).first()
    if not c:
        raise HTTPException(status_code=404, detail="Mover not found")

    return CoachResponse(
        id=c.id,
        slug=c.slug,
        name=c.name,
        title=c.title,
        bio=c.bio,
        image=c.image,
    )


def get_sessions(slug: str, db: Session, user_id: int | None = None):
    sessions = db.query(CoachSession).join(
        Coach).filter(Coach.slug == slug).all()

    booked_session_ids: set[int] = set()
    if user_id is not None:
        booked_session_ids = {
            coach_session_id for (coach_session_id,) in db.query(Booking.coach_session_id).filter(
                Booking.user_id == user_id,
                Booking.coach_session_id != None
            ).all()
        }

    print(booked_session_ids)

    result = []
    for s in sessions:

        result.append(
            CoachSessionResponse(
                id=s.id,
                coach=CoachBase(
                    id=s.coach.id,
                    slug=s.coach.slug,
                    title=s.coach.title,
                    name=s.coach.name,
                    image=s.coach.image,
                ),
                start=s.start_date,
                end=s.end_date,
                isBooked=s.id in booked_session_ids
            )
        )
    return result

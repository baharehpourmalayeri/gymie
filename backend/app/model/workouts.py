from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.database import Base


class Workout(Base):
    __tablename__ = "workouts"
    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String, unique=True, index=True)
    title = Column(String)
    description = Column(String)
    long_description = Column(String)
    image = Column(String, nullable=True)

    bookings = relationship("Booking", back_populates="workout")
    favorites = relationship("Favorite", back_populates="workout")
    sessions = relationship("WorkoutSession", back_populates="workout")


class WorkoutSession(Base):
    __tablename__ = "workout_sessions"
    id = Column(Integer, primary_key=True, index=True)
    workout_id = Column(Integer, ForeignKey("workouts.id"))
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    capacity = Column(Integer)
    booked = Column(Integer)

    bookings = relationship("Booking", back_populates="workout_session")
    workout = relationship("Workout", back_populates="sessions")

from app.database import Base
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship


class Booking(Base):
    __tablename__ = "bookings"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    workout_id = Column(Integer, ForeignKey("workouts.id"))
    workout_session_id = Column(Integer, ForeignKey("workout_sessions.id"))
    coach_id = Column(Integer, ForeignKey("coaches.id"))
    coach_session_id = Column(Integer, ForeignKey("coach_sessions.id"))

    user = relationship("User", back_populates="bookings")
    workout = relationship("Workout", back_populates="bookings")
    workout_session = relationship("WorkoutSession", back_populates="bookings")
    coach = relationship("Coach", back_populates="bookings")
    coach_session = relationship("CoachSession", back_populates="bookings")

from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.database import Base


class Coach(Base):
    __tablename__ = "coaches"
    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String, unique=True, index=True)
    name = Column(String)
    title = Column(String)
    bio = Column(String)
    image = Column(String, nullable=True)

    bookings = relationship("Booking", back_populates="coach")
    sessions = relationship("CoachSession", back_populates="coach")


class CoachSession(Base):
    __tablename__ = "coach_sessions"
    id = Column(Integer, primary_key=True, index=True)
    coach_id = Column(Integer, ForeignKey("coaches.id"))
    start_date = Column(DateTime)
    end_date = Column(DateTime)

    bookings = relationship("Booking", back_populates="coach_session")
    coach = relationship("Coach", back_populates="sessions")

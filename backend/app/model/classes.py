from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from app.database import Base


class GymClass(Base):
    __tablename__ = "classes"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    trainer = Column(String)
    training = Column(String)  # Yoga, HIIT, etc.
    datetime = Column(DateTime)
    capacity = Column(Integer)
    image = Column(String, nullable=True)

    bookings = relationship("Booking", back_populates="gym_class")
    favorites = relationship("Favorite", back_populates="gym_class")

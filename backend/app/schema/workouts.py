from pydantic import BaseModel
from datetime import datetime


class WorkoutBase (BaseModel):
    id: int
    slug: str
    title: str
    description: str
    image: str | None = None


class WorkoutResponse(WorkoutBase):
    longDescription: str
    isFavorite: bool = False

    class Config:
        orm_mode = True


class WorkoutSessionResponse(BaseModel):
    id: int
    workout: WorkoutBase
    start: datetime
    end: datetime
    capacity: int
    booked: int
    isBooked: bool

    class Config:
        orm_mode = True

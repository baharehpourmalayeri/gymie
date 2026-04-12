from pydantic import BaseModel
from datetime import datetime
from app.schema.coaches import CoachBase
from app.schema.workouts import WorkoutBase


class WorkoutBookingCreate(BaseModel):
    workout_id: int
    workout_session_id: int


class CoachBookingCreate(BaseModel):
    coach_id: int
    coach_session_id: int


class WorkoutBookingResponse(BaseModel):
    id: int
    session_id: int
    workout: WorkoutBase
    start: datetime
    end: datetime
    capacity: int
    booked: int

    class Config:
        orm_mode = True


class CoachBookingResponse(BaseModel):
    id: int
    session_id: int
    coach: CoachBase
    start: datetime
    end: datetime

    class Config:
        orm_mode = True

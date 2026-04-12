from pydantic import BaseModel


class WorkoutBookingCreate(BaseModel):
    workout_id: int
    workout_session_id: int


class CoachBookingCreate(BaseModel):
    coach_id: int
    coach_session_id: int


class WorkoutBookingResponse(BaseModel):
    id: int
    workout_id: int

    class Config:
        orm_mode = True


class CoachBookingResponse(BaseModel):
    id: int
    coach_id: int

    class Config:
        orm_mode = True

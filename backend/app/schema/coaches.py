from pydantic import BaseModel
from datetime import datetime


class CoachBase(BaseModel):
    id: int
    slug: str
    title: str
    name: str
    image: str | None = None


class CoachResponse(CoachBase):
    bio: str

    class Config:
        orm_mode = True


class CoachSessionResponse(BaseModel):
    id: int
    coach: CoachBase
    start: datetime
    end: datetime
    isBooked: bool

    class Config:
        orm_mode = True

from pydantic import BaseModel
from datetime import datetime



class GymClassResponse(BaseModel):
    id: int
    name: str
    trainer: str
    training: str # Yoga, HIIT, etc.
    datetime: datetime
    capacity: int
    image: str | None = None
    free_spots: int
    is_full: bool

    class Config:
        orm_mode = True

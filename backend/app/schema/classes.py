from pydantic import BaseModel
from datetime import datetime



class GymClassResponse(BaseModel):
    id: int
    name: str
    trainer: str
    type: str  # keep same as DB
    datetime: datetime
    capacity: int
    image: str | None = None
    free_spots: int
    is_full: bool

    class Config:
        orm_mode = True

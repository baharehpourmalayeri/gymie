from pydantic import BaseModel
from datetime import datetime


class BookingBase(BaseModel):
    user_id: int
    class_id: int


class BookingCreate(BookingBase):
    pass


class BookingResponse(BookingBase):
    id: int

    class Config:
        orm_mode = True

from pydantic import BaseModel


class FavoriteResponse(BaseModel):
    id: int
    user_id: int
    workout_id: int

    class Config:
        orm_mode = True

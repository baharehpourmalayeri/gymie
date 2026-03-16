from pydantic import BaseModel
from datetime import datetime


class UserCreate(BaseModel):
    name: str
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: str

    class Config:
        orm_mode = True


class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse


class FavoriteBase(BaseModel):
    user_id: int
    class_id: int

class FavoriteCreate(FavoriteBase):
    pass

class FavoriteResponse(FavoriteBase):
    id: int

    class Config:
        orm_mode = True

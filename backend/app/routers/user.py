from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schema.user import UserCreate, UserLogin, UserResponse, TokenResponse
from app.crud import user as crud_user
from app.database import get_db

router = APIRouter(
    prefix="/users",
    tags=["users"]
)


@router.post("/register", response_model=TokenResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):
    return crud_user.register_user(user, db)


@router.post("/login", response_model=TokenResponse)
def login(user_credentials: UserLogin, db: Session = Depends(get_db)):
    return crud_user.login_user(user_credentials, db)


@router.get("/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    return crud_user.get_user(user_id, db)

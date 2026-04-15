from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schema.user import UserCreate, UserLogin, UserResponse, TokenResponse
from app.crud import user as crud_user
from app.database import get_db
from app.schema.user import ChangePasswordRequest
from app.crud.user import change_password
from app.utils.auth import verify_token

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


@router.post("/change-password")
def change_user_password(
    data: ChangePasswordRequest,
    db: Session = Depends(get_db),
    token_data: dict = Depends(verify_token)
):
    user_id = token_data["user_id"]

    return change_password(
        user_id=user_id,
        current_password=data.current_password,
        new_password=data.new_password,
        confirm_new_password=data.confirm_new_password,
        db=db
    )

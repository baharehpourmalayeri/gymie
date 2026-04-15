from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from datetime import timedelta

from app.model.user import User
from app.schema.user import UserCreate, UserLogin, TokenResponse
from app.utils.auth import (
    hash_password,
    verify_password,
    create_access_token,
    ACCESS_TOKEN_EXPIRE_MINUTES
)


def get_user(user_id: int, db: Session):
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    return user


def get_user_by_email(email: str, db: Session):
    return db.query(User).filter(User.email == email).first()


def get_user_by_username(name: str, db: Session):
    return db.query(User).filter(User.name == name).first()


def register_user(user: UserCreate, db: Session):
    if get_user_by_email(user.email, db):
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    # Check username
    if get_user_by_username(user.name, db):
        raise HTTPException(
            status_code=400,
            detail="Username already taken"
        )

    hashed_password = hash_password(user.password)

    user = User(
        name=user.name,
        email=user.email,
        password=hashed_password
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    access_token = create_access_token(
        data={"sub": str(user.id)},
        expires_delta=access_token_expires
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user
    }


def login_user(credentials: UserLogin, db: Session):

    user = get_user_by_email(credentials.email, db)

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not verify_password(credentials.password, user.password):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    access_token = create_access_token(
        data={"sub": str(user.id)},
        expires_delta=access_token_expires
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user
    }


def change_password(user_id: int, current_password: str, new_password: str, confirm_new_password: str, db: Session):
    if new_password != confirm_new_password:
        raise HTTPException(
            status_code=400,
            detail="New password does not match confirm new password "
        )

    user = get_user(user_id, db)

    if not verify_password(current_password, user.password):
        raise HTTPException(
            status_code=400,
            detail="Current password is incorrect"
        )

    user.password = hash_password(new_password)

    db.commit()
    db.refresh(user)

    return {"message": "Password updated successfully"}

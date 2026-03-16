from sqlalchemy.orm import Session
from app.model.user import User
from app.schema.user import UserCreate
from app.utils.auth import hash_password


def get_user_by_id(db: Session, user_id: int):
    """Get user by ID"""
    return db.query(User).filter(User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    """Get user by email"""
    return db.query(User).filter(User.email == email).first()


def get_user_by_username(db: Session, name: str):
    """Get user by username"""
    return db.query(User).filter(User.name == name).first()


def create_user(db: Session, user: UserCreate):
    """Create a new user with hashed password"""
    hashed_password = hash_password(user.password)
    db_user = User(
        name=user.name,
        email=user.email,
        password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.crud import favorites as crud_favorites
from app.database import get_db
from app.schema.favorites import FavoriteResponse
from app.schema.workouts import WorkoutResponse
from app.utils.auth import verify_token

router = APIRouter(
    prefix="/favorites",
    tags=["favorites"],
)


@router.post("/{workout_slug}", response_model=FavoriteResponse)
def create_favorite(
    workout_slug: str,
    token_data: dict = Depends(verify_token),
    db: Session = Depends(get_db),
):
    user_id = int(token_data["user_id"])
    return crud_favorites.create_favorite(user_id, workout_slug, db)


@router.delete("/{workout_slug}")
def remove_favorite(
    workout_slug: str,
    token_data: dict = Depends(verify_token),
    db: Session = Depends(get_db),
):
    user_id = int(token_data["user_id"])
    return crud_favorites.remove_favorite(user_id, workout_slug, db)


@router.get("/me", response_model=list[WorkoutResponse])
def get_user_favorites(
    token_data: dict = Depends(verify_token),
    db: Session = Depends(get_db),
):
    user_id = int(token_data["user_id"])
    return crud_favorites.get_user_favorites(user_id, db)

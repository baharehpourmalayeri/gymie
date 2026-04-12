from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schema.workouts import WorkoutResponse
from app.crud import workouts as crud_workouts
from app.database import get_db
from app.utils.auth import verify_token_optional

router = APIRouter(
    prefix="/workouts",
    tags=["workouts"]
)


# Get all workouts
@router.get("/", response_model=list[WorkoutResponse])
def get_workouts(
    limit: int = 0,
    filter: str = None,
    token_data: dict | None = Depends(verify_token_optional),
    db: Session = Depends(get_db),
):
    user_id = int(token_data["user_id"]) if token_data else None
    return crud_workouts.get_workouts(limit, filter, db, user_id)


# Get single workout by slug
@router.get("/{slug}", response_model=WorkoutResponse)
def get_workout(
    slug: str,
    token_data: dict | None = Depends(verify_token_optional),
    db: Session = Depends(get_db),
):
    user_id = int(token_data["user_id"]) if token_data else None
    return crud_workouts.get_workout(slug, db, user_id)


@router.get("/{slug}/sessions")
def get_workout_sessions(slug: str, token_data: dict | None = Depends(verify_token_optional), db: Session = Depends(get_db)):
    user_id = int(token_data["user_id"]) if token_data else None
    return crud_workouts.get_sessions(slug, db, user_id)

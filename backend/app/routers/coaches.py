from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schema.coaches import CoachResponse
from app.crud import coaches as crud_coaches
from app.database import get_db
from app.utils.auth import verify_token_optional

router = APIRouter(
    prefix="/coaches",
    tags=["coaches"]
)


# Get all coaches
@router.get("/", response_model=list[CoachResponse])
def get_coaches(db: Session = Depends(get_db)):
    return crud_coaches.get_coaches(db)


# Get single coach by slug
@router.get("/{slug}", response_model=CoachResponse)
def get_coach(slug: str, db: Session = Depends(get_db)):
    return crud_coaches.get_coach(slug, db)


@router.get("/{slug}/sessions")
def get_coach_sessions(slug: str,  token_data: dict | None = Depends(verify_token_optional), db: Session = Depends(get_db)):
    user_id = int(token_data["user_id"]) if token_data else None
    return crud_coaches.get_sessions(slug, db, user_id)

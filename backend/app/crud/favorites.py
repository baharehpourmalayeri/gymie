from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.model.user import Favorite
from app.model.workouts import Workout
from app.schema.workouts import WorkoutResponse


def create_favorite(user_id: int, workout_slug: str, db: Session):
    workout = db.query(Workout).filter(Workout.slug == workout_slug).first()
    if not workout:
        raise HTTPException(status_code=404, detail="Workout not found")

    existing = db.query(Favorite).filter(
        Favorite.user_id == user_id,
        Favorite.workout_id == workout.id,
    ).first()
    if existing:
        raise HTTPException(
            status_code=400, detail="Workout is already in favorites")

    favorite = Favorite(user_id=user_id, workout_id=workout.id)
    db.add(favorite)
    db.commit()
    db.refresh(favorite)
    return favorite


def remove_favorite(user_id: int, workout_slug: str, db: Session):
    workout = db.query(Workout).filter(Workout.slug == workout_slug).first()
    if not workout:
        raise HTTPException(status_code=404, detail="Workout not found")

    favorite = db.query(Favorite).filter(
        Favorite.user_id == user_id,
        Favorite.workout_id == workout.id,
    ).first()
    if not favorite:
        raise HTTPException(status_code=404, detail="Favorite not found")

    db.delete(favorite)
    db.commit()
    return {"detail": "Favorite removed"}


def get_user_favorites(user_id: int, db: Session):
    workouts = db.query(Workout).join(
        Favorite,
        Favorite.workout_id == Workout.id,
    ).filter(Favorite.user_id == user_id).all()

    return [
        WorkoutResponse(
            id=w.id,
            slug=w.slug,
            title=w.title,
            description=w.description,
            longDescription=w.long_description,
            image=w.image,
            isFavorite=True,
        )
        for w in workouts
    ]

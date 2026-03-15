from app.schema.classes import GymClassResponse
from fastapi import APIRouter
from app.crud import classes as crud_classes

router = APIRouter(
    prefix="/classes",
    tags=["classes"]
)


# Get all classes
@router.get("/", response_model=list[GymClassResponse])
def get_classes():
    return crud_classes.get_classes()


# Get single class by ID
@router.get("/{class_id}", response_model=GymClassResponse)
def get_class(class_id: int):
    return crud_classes.get_class(class_id)

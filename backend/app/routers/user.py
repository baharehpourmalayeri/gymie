from app.schema.classes import GymClassResponse
from fastapi import APIRouter
from app.crud import classes as crud_classes

router = APIRouter(
    prefix="/classes",
    tags=["classes"]
)


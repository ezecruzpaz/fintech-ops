from fastapi import APIRouter, Depends
from app.core.deps import get_current_user

router = APIRouter()

@router.get("/")
def get_orders(user=Depends(get_current_user)):
    return {
        "message": "Orders protegidas",
        "user": user
    }
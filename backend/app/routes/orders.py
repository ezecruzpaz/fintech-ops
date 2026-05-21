from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_orders():
    return {
        "data": [],
        "message": "Orders endpoint funcionando"
    }
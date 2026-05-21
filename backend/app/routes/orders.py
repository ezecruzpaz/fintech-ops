from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.db.deps import get_db
from app.services.orders_service import get_orders_service
from app.core.deps import get_current_user

router = APIRouter()

@router.get("/")
def get_orders(
    search: str = Query(None),
    status: str = Query(None),
    page: int = Query(1),
    limit: int = Query(10),
    sort: str = Query("created_at"),
    order: str = Query("desc"),
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    return get_orders_service(
        db=db,
        search=search,
        status=status,
        page=page,
        limit=limit,
        sort=sort,
        order=order
    )
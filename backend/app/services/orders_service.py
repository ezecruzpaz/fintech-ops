from sqlalchemy.orm import Session
from sqlalchemy import or_, desc, asc
from app.models.order import Order
from fastapi import HTTPException

def get_orders_service(
    db: Session,
    search: str = None,
    status: str = None,
    page: int = 1,
    limit: int = 10,
    sort: str = "created_at",
    order: str = "desc"
):
    query = db.query(Order)

    # SEARCH
    if search:
        query = query.filter(
            or_(
                Order.customer_name.ilike(f"%{search}%"),
                Order.customer_email.ilike(f"%{search}%")
            )
        )

    # FILTER
    if status:
        query = query.filter(Order.status == status)

    # SORT
    sort_column = getattr(Order, sort, Order.created_at)
    if order == "desc":
        query = query.order_by(desc(sort_column))
    else:
        query = query.order_by(asc(sort_column))

    # PAGINATION
    total = query.count()
    offset = (page - 1) * limit

    data = query.offset(offset).limit(limit).all()

    return {
        "data": data,
        "total": total,
        "page": page,
        "limit": limit
    }
def get_order_by_id_service(db, order_id: str):
    order = db.query(Order).filter(Order.id == order_id).first()

    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    return order
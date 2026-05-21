from sqlalchemy import Column, String, Float, DateTime
from datetime import datetime
import uuid

from app.models import Base

class Order(Base):
    __tablename__ = "orders"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    customer_name = Column(String)
    customer_email = Column(String, index=True)
    amount = Column(Float)
    status = Column(String, index=True)
    payment_method = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
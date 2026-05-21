from app.db.session import SessionLocal
from app.models.order import Order
import random

db = SessionLocal()

statuses = ["paid", "pending", "failed", "refunded"]
methods = ["card", "paypal", "transfer"]

for i in range(20):
    order = Order(
        customer_name=f"User {i}",
        customer_email=f"user{i}@test.com",
        amount=random.randint(100, 1000),
        status=random.choice(statuses),
        payment_method=random.choice(methods)
    )
    db.add(order)

db.commit()
db.close()

print("Seed completed")
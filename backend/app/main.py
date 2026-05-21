from fastapi import FastAPI
from app.routes import orders, auth
from app.models import Base
from app.db.session import engine

app = FastAPI()


Base.metadata.create_all(bind=engine)

app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(orders.router, prefix="/orders", tags=["Orders"])
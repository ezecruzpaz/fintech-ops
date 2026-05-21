from fastapi import FastAPI
from app.routes import orders

app = FastAPI()

app.include_router(orders.router, prefix="/orders", tags=["Orders"])

@app.get("/")
def root():
    return {"message": "Fintech API running 🚀"}
from fastapi import FastAPI
from app.routes import orders
from app.routes import auth

app = FastAPI()

app.include_router(orders.router, prefix="/orders", tags=["Orders"])
app.include_router(auth.router, prefix="/auth", tags=["Auth"])

@app.get("/")
def root():
    return {"message": "Fintech API running 🚀"}
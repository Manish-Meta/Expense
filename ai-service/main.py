from fastapi import FastAPI
from services.backend_client import fetch_expense_data
from models.seasonal import seasonal_prediction
from models.budget_overrun import budget_prediction
from models.category_risk import category_risk_prediction

app = FastAPI(title="Expense AI Service")

@app.get("/predict/all/{user_id}")
def run_all_predictions(user_id: str):
    data = fetch_expense_data(user_id)

    return {
        "seasonal": seasonal_prediction(data),
        "budget": budget_prediction(data),
        "category": category_risk_prediction(data)
    }

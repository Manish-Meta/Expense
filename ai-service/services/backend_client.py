import requests
import os

BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:5000")

def fetch_expense_summary(user_id: str):
    res = requests.get(f"{BACKEND_URL}/analytics/expense-summary/{user_id}")
    res.raise_for_status()
    return res.json()

def fetch_monthly_trend(user_id: str):
    res = requests.get(f"{BACKEND_URL}/analytics/monthly-trend/{user_id}")
    res.raise_for_status()
    return res.json()

def fetch_category_summary(user_id: str):
    res = requests.get(f"{BACKEND_URL}/analytics/category-summary/{user_id}")
    res.raise_for_status()
    return res.json()

def fetch_expense_data(user_id: str):
    return {
        "summary": fetch_expense_summary(user_id),
        "monthly": fetch_monthly_trend(user_id),
        "category": fetch_category_summary(user_id),
    }

def save_prediction(payload):
    res = requests.post(
        f"{BACKEND_URL}/predictions",
        json=payload
    )
    res.raise_for_status()
    return res.json()

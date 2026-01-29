from services.backend_client import fetch_expense_summary

def budget_prediction():
    data = fetch_expense_summary()

    spent = data["total_spent"]
    budget = data["monthly_budget"]

    overrun = spent > budget

    return {
        "type": "BUDGET",
        "title": "Budget Overrun Risk",
        "description": f"Spent {spent} against budget {budget}",
        "confidence": 92 if overrun else 70,
        "impact": "High" if overrun else "Medium",
        "recommendation": "Review discretionary spending",
        "horizon": "Monthly"
    }

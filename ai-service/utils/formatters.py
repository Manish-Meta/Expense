def format_seasonal_prediction(result):
    return {
        "type": "SEASONAL_SPENDING",
        "title": "Seasonal Spending Spike Detected",
        "description": f"High spending observed during {result['quarter']}",
        "confidence": int(result["confidence"]),
        "impact": result["impact"],
        "recommendation": "Review Q4 budgets and tighten controls",
        "horizon": result["quarter"]
    }


def format_budget_prediction(result):
    return {
        "type": "BUDGET_OVERRUN",
        "title": "Budget Overrun Risk",
        "description": "User spending nearing monthly budget limit",
        "confidence": int(result["confidence"]),
        "impact": "High" if result["status"] == "Overrun" else "Medium",
        "recommendation": "Notify user and restrict high-risk categories",
        "horizon": "Current Month"
    }

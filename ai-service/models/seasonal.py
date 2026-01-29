from services.backend_client import fetch_monthly_trend

def seasonal_prediction():
    data = fetch_monthly_trend()

    q4 = [d["amount"] for d in data if d["month"] in (10,11,12)]
    avg = sum(q4) / len(q4) if q4 else 0

    spike = avg > 4000

    return {
        "type": "SEASONAL",
        "title": "Seasonal Spending Pattern",
        "description": "Q4 shows higher spending trend",
        "confidence": 88,
        "impact": "High" if spike else "Medium",
        "recommendation": "Plan Q4 budget buffers",
        "horizon": "Quarterly"
    }

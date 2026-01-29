from services.backend_client import fetch_category_summary

def category_risk_prediction():
    data = fetch_category_summary()

    risky = max(data, key=lambda x: x["total"])

    return {
        "type": "CATEGORY",
        "title": f"High Risk Category: {risky['cat_name']}",
        "description": f"{risky['cat_name']} has highest spend",
        "confidence": 85,
        "impact": "High",
        "recommendation": "Introduce approval limits",
        "horizon": "Ongoing"
    }

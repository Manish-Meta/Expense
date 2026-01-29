def build_prediction(
    type: str,
    title: str,
    description: str,
    confidence: int,
    impact: str,
    recommendation: str,
    horizon: str
):
    return {
        "type": type,
        "title": title,
        "description": description,
        "confidence": confidence,
        "impact": impact,
        "recommendation": recommendation,
        "horizon": horizon
    }

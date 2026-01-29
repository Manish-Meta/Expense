import requests
import os

BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:3000")

def send_prediction_to_backend(prediction: dict):
    res = requests.post(
        f"{BACKEND_URL}/predictions",
        json=prediction,
        timeout=5
    )
    res.raise_for_status()
    return res.json()

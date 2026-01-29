from core.config import BACKEND_BASE_URL
from core.http_client import post

def save_prediction(prediction_payload: dict):
    return post(
        f"{BACKEND_BASE_URL}/predictions",
        prediction_payload
    )

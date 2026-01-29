from core.config import BACKEND_BASE_URL
from core.http_client import get

def fetch_employee_expenses(emp_id: str):
    return get(
        f"{BACKEND_BASE_URL}/expenses/{emp_id}"
    )

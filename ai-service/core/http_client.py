import requests

def get(url, params=None):
    response = requests.get(url, params=params)
    response.raise_for_status()
    return response.json()

def post(url, payload):
    response = requests.post(url, json=payload)
    response.raise_for_status()
    return response.json()

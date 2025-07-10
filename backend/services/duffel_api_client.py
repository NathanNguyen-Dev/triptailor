import httpx
import os
from dotenv import load_dotenv

load_dotenv()

DUFFEL_API_URL = "https://api.duffel.com"
DUFFEL_HEADERS = {
    "Authorization": f"Bearer {os.getenv('DUFFEL_API_KEY')}",
    "Accept": "application/json",
    "Content-Type": "application/json"
}

async def search_flights(origin: str, destination: str, departure_date: str, return_date: str = None, passengers: int = 1):
    payload = {
        "slices": [
            {
                "origin": origin,
                "destination": destination,
                "departure_date": departure_date
            }
        ],
        "passengers": [{"type": "adult"} for _ in range(passengers)],
        "cabin_class": "economy"
    }
    if return_date:
        payload["slices"].append({
            "origin": destination,
            "destination": origin,
            "departure_date": return_date
        })
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{DUFFEL_API_URL}/air/offer_requests",
            headers=DUFFEL_HEADERS,
            json=payload
        )
        response.raise_for_status()
        return response.json()

async def book_flight(offer_id: str, passengers_info: list, payment_info: dict):
    payload = {
        "selected_offers": [offer_id],
        "payments": [payment_info],
        "passengers": passengers_info
    }
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{DUFFEL_API_URL}/air/orders",
            headers=DUFFEL_HEADERS,
            json=payload
        )
        response.raise_for_status()
        return response.json() 
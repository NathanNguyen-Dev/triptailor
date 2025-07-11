import httpx
import os
from dotenv import load_dotenv

load_dotenv()

DUFFEL_API_URL = "https://api.duffel.com"
DUFFEL_HEADERS = {
    "Authorization": f"Bearer {os.getenv('DUFFEL_API_KEY')}",
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Duffel-Version": "v2"
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
    print("Duffel search_flights payload:", payload)
    async with httpx.AsyncClient(timeout=30.0) as client:
        try:
            response = await client.post(
                f"{DUFFEL_API_URL}/air/offer_requests",
                headers=DUFFEL_HEADERS,
                json={"data": payload}
            )
            response.raise_for_status()
            data = response.json()
            # Limit to top 2 offers by price if present
            if "data" in data and "offers" in data["data"]:
                offers = data["data"]["offers"]
                offers_sorted = sorted(offers, key=lambda o: float(o.get("total_amount", "inf")))
                data["data"]["offers"] = offers_sorted[:2]
            return data
        except httpx.HTTPStatusError as e:
            print("Duffel error:", e.response.text)
            raise

async def book_flight(offer_id: str, passengers_info: list, payment_info: dict):
    payload = {
        "selected_offers": [offer_id],
        "payments": [payment_info],
        "passengers": passengers_info
    }
    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.post(
            f"{DUFFEL_API_URL}/air/orders",
            headers=DUFFEL_HEADERS,
            json={"data": payload}
        )
        response.raise_for_status()
        return response.json() 
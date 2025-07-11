import google.genai as genai
from google.genai import types
import os
from dotenv import load_dotenv
from prompts import system_instruction
from services.duffel_api_client import search_flights, book_flight

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

flight_function_tools = [
    types.Tool(
        function_declarations=[
            types.FunctionDeclaration(
                name="search_flights",
                description="Search for available flights.",
                parameters={
                    "type": "object",
                    "properties": {
                        "origin": {"type": "string", "description": "IATA code of the departure airport."},
                        "destination": {"type": "string", "description": "IATA code of the arrival airport."},
                        "departure_date": {"type": "string", "description": "Departure date in YYYY-MM-DD format (e.g., 2025-07-20)."},
                        "return_date": {"type": "string", "description": "Return date in YYYY-MM-DD format for round trips (e.g., 2025-07-25)."},
                        "passengers": {"type": "integer", "description": "Number of passengers. Defaults to 1."}
                    },
                    "required": ["origin", "destination", "departure_date"]
                }
            ),
            types.FunctionDeclaration(
                name="book_flight",
                description="Book a flight using the selected offer ID, passenger details, and payment information.",
                parameters={
                    "type": "object",
                    "properties": {
                        "offer_id": {"type": "string", "description": "ID of the selected flight offer."},
                        "passengers_info": {
                            "type": "array",
                            "description": "List of passenger details, e.g., [{'type': 'adult', 'first_name': 'John', 'last_name': 'Doe'}]",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "type": {"type": "string", "description": "Passenger type (e.g., 'adult')."},
                                    "first_name": {"type": "string", "description": "First name of the passenger."},
                                    "last_name": {"type": "string", "description": "Last name of the passenger."}
                                },
                                "required": ["type", "first_name", "last_name"]
                            }
                        },
                        "payment_info": {
                            "type": "object",
                            "description": "Payment information, e.g., {'type': 'arc_bsp_cash'}. In a real app, this would be more complex.",
                            "properties": {
                                "type": {"type": "string", "description": "Payment type (e.g., 'arc_bsp_cash')."}
                            },
                            "required": ["type"]
                        }
                    },
                    "required": ["offer_id", "passengers_info", "payment_info"]
                }
            )
        ]
    )
]

all_tools = flight_function_tools

generation_config = types.GenerateContentConfig(
    tools=all_tools
)

# Example: how to use in an endpoint or function
# response = client.models.generate_content(
#     model="gemini-2.5-flash",
#     contents="Who won the euro 2024?",
#     config=generation_config,
# )
# print(response.text) 
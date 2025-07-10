from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.duffel_api_client import search_flights, book_flight
from services.gemini_setup import client, generation_config
from prompts import api_error_message

router = APIRouter()

available_functions = {
    "search_flights": search_flights,
    "book_flight": book_flight,
}

class ChatRequest(BaseModel):
    message: str

@router.post("/chat")
async def chat_endpoint(chat_request: ChatRequest):
    try:
        # Use Gemini client with combined tools and grounding
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=chat_request.message,
            config=generation_config,
        )
        if hasattr(response, 'text') and response.text:
            return {"response": response.text}
        else:
            return {"response": "I processed your request, but I don't have a direct text response. I might have performed a search or initiated a booking based on your input."}
    except Exception as e:
        print(f"Error during chat processing: {e}")
        raise HTTPException(status_code=500, detail=api_error_message) 
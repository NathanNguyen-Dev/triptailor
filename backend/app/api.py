from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.duffel_api_client import search_flights, book_flight
from services.gemini_setup import client, generation_config
from prompts import api_error_message
import asyncio
import traceback

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
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=chat_request.message,
            config=generation_config,
        )
        parts = getattr(response.candidates[0].content, "parts", [])
        for part in parts:
            if hasattr(part, "function_call") and part.function_call:
                fn = part.function_call
                fn_name = getattr(fn, "name", None)
                fn_args = getattr(fn, "args", None)
                if fn_name in available_functions and fn_args:
                    # Call the Python function with the extracted arguments
                    func = available_functions[fn_name]
                    # Ensure fn_args is a dict
                    if hasattr(fn_args, "__dict__"):
                        fn_args = fn_args.__dict__
                    # Await the function if it's async
                    if asyncio.iscoroutinefunction(func):
                        result = await func(**fn_args)
                    else:
                        result = func(**fn_args)
                    return {"response": result}
                else:
                    return {"response": f"Function call detected but function '{fn_name}' not found or args missing: {fn_args}"}
        if hasattr(response, 'text') and response.text:
            return {"response": response.text}
        else:
            return {"response": "I processed your request, but I don't have a direct text response. I might have performed a search or initiated a booking based on your input."}
    except Exception as e:
        print("Error during chat processing:")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=api_error_message) 
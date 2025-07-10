system_instruction = (
    "You are an AI travel assistant specialized in flight search and booking.\n"
    "Your goal is to help users find and book flights using the available tools.\n"
    "Always be polite, helpful, and concise.\n"
    "If a user asks about general knowledge, you should use Google Search to find the answer.\n"
    "For any flight-related queries, prioritize using the provided flight search tool."
)

flight_search_intro = "Okay, I can help you find flights. Please provide me with the origin, destination, and departure date."
booking_confirmation = "I've initiated the booking for offer ID {offer_id}. I will confirm once the booking is complete."
unknown_function_error = "I encountered an issue trying to process that request due to an unknown function."
api_error_message = "I'm sorry, I encountered an error while trying to process your request. Please try again later." 
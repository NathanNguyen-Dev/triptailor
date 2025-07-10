# triptailor Backend

This is the backend for the triptailor project, powered by FastAPI.

## Structure

- `app/` - Main FastAPI app code
- `routers/` - API route definitions
- `services/` - Integrations (Gemini, Duffel, Google Search, etc.)
- `prompts/` - Prompt management
- `models/` - Pydantic models
- `utils/` - Helper functions

## Setup

1. Create a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the server:
   ```bash
   uvicorn main:app --reload
   ```

## Docker

To run with Docker:
```bash
docker build -t triptailor-backend .
docker run -p 8000:8000 triptailor-backend
``` 
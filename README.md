# triptailor Monorepo

This project contains both the frontend (React + Vite) and backend (FastAPI) for the triptailor AI-powered travel assistant.

## Structure

- `frontend/` — React app (Vite, Tailwind, etc.)
- `backend/` — FastAPI backend (Python)
- `docs/` — Documentation

## Development

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

## Docker Compose (Recommended)

_Coming soon: add a `docker-compose.yml` to orchestrate both services._

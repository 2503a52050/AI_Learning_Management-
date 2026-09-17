# AI-LMS

AI-LMS is a full-stack learning management system and student performance workspace. The repository contains a FastAPI backend, SQLAlchemy persistence, JWT role authentication, a Vite React client, seeded demo data, analytics, and a fallback AI assistant.

## Run with Docker

```bash
cp .env.example .env
docker compose up --build
```

Open `http://localhost:5173`. API documentation is available at `http://localhost:8000/docs`.

## Demo accounts

All demo accounts use password `Demo@123`:

- Student: `student@ailms.com`
- Faculty: `faculty@ailms.com`
- Admin: `admin@ailms.com`

## Run locally

Backend (SQLite is used when `DATABASE_URL` is omitted):

```bash
cd backend
python -m venv .venv
.venv\\Scripts\\activate
pip install -r requirements.txt
python -m app.seed
uvicorn app.main:app --reload
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Set `VITE_API_URL=http://localhost:8000/api` in `frontend/.env`. For PostgreSQL locally, set `DATABASE_URL` to a PostgreSQL SQLAlchemy URL before starting the backend.

## API surface

Authentication: `/api/auth/register`, `/api/auth/login`, `/api/auth/me`

Learning: `/api/courses`, `/api/assignments`, `/api/assignments/{id}/submit`, `/api/attendance/student/{id}`

Analytics and AI: `/api/analytics/student/{id}`, `/api/ai/predict-performance`, `/api/ai/recommendations`, `/api/ai/chat`

All protected endpoints require `Authorization: Bearer <token>`. Swagger provides an interactive contract at `/docs`.

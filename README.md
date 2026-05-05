# AI Tool Hub

A full-stack directory of AI tools with a MongoDB-backed Express API and a React + Vite + Tailwind frontend. The app lists tools with categories, tags, icons, search, filtering, and inline tool creation.

## Tech Stack
- **Frontend:** React 18, Vite, Tailwind CSS, Axios
- **Backend:** Node.js, Express, Mongoose (MongoDB)
- **Database:** MongoDB (local or Atlas)

## Prerequisites
- Node.js 18+
- MongoDB URI (local `mongodb://127.0.0.1:27017/ai-tool-hub` or Atlas)

## Setup
1. Clone the repo and install dependencies:
   ```bash
   cd server && npm install
   cd ../client && npm install
   ```
2. Configure env vars:
   - Copy `server/.env.example` to `server/.env`
   - Set `MONGODB_URI` and optional `PORT` (default 5001)

## Running the app (two terminals)
**Terminal 1 – Backend**
```bash
cd server
npm run dev   # nodemon, default http://localhost:5001
```

**Terminal 2 – Frontend**
```bash
cd client
npm run dev   # Vite, default http://localhost:5173
```

Open the frontend URL; it will call the API at `VITE_API_URL` (fallback `http://localhost:5001`).

## Seeding & Data
- On server start, `seedTools()` inserts any missing tools from `seedData` without duplicates (checks name/link).
- POST `/api/tools` supports adding tools from the UI; `icon` is optional with a Clearbit fallback when missing.

## Available Scripts
- **server:** `npm run dev`, `npm start`
- **client:** `npm run dev`, `npm run build`, `npm run preview`

## Notes
- Icons load from provided URLs; fallback shows the first letter when broken or missing.
- Dark, minimal UI with categories, search, stats, and add-tool form.

## Hosted Link
- https://aitoolhub47.vercel.app
- 

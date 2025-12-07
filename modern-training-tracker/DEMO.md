# Modern Training Tracker — 2-3 Minute Demo Walkthrough

## Setup (30 seconds)
1. **Start the server:**
   ```powershell
   cd 'c:\Users\gmlee\Downloads\modern-training-tracker\modern-training-tracker'
   node src/server.js
   # Server runs on http://localhost:3000
   ```

2. **Open the demo UI:**
   - Navigate to: **http://localhost:3000/**
   - You'll see a clean, modern interface for the Training Tracker.

---

## Demo Flow (2-3 minutes)

### 1. Health Check (15 seconds)
- **Click "Check Health"**
- Show the JSON response:
  ```json
  {
    "status": "ok",
    "service": "modern-training-tracker",
    "version": "1.0.0",
    "gitSha": "c70a0c8",
    "uptime": 45,
    "timestamp": "2025-12-07T20:30:00.000Z"
  }
  ```
- **Talking point:** "The health endpoint gives us uptime, version, git SHA, and timestamp—perfect for monitoring in production."

### 2. View Current Workouts (20 seconds)
- **Click "Refresh"** button (already loaded on page load)
- **Show the list:**
  - Currently one seed workout: `2025-11-01 — basketball shooting (60 min)`
- **Talking point:** "The API returns an array of all workouts stored in memory. Each has an ID, date, type, duration, and notes."

### 3. Create a New Workout (45 seconds - 1 minute)
- **Fill in the form:**
  - **Date:** Pick today's date (e.g., 2025-12-07)
  - **Type:** "strength training" (or any other)
  - **Duration (minutes):** 30
  - **Notes:** "Upper body with focus on bench press" (optional)
- **Click "Create"**
- **Show the response:**
  - Returns the newly created object with an auto-generated ID:
    ```json
    {
      "id": 2,
      "date": "2025-12-07",
      "type": "strength training",
      "durationMinutes": 30,
      "notes": "Upper body with focus on bench press"
    }
    ```
- **Click "Refresh"**
- **Show updated list** — the new workout appears in the list!
- **Talking point:** "The API handles POST requests to create, and GET to retrieve. You can create multiple workouts and they persist in memory during the session."

### 4. Create Another Workout (optional, 30 seconds)
- **Repeat step 3** with different data:
  - Date: 2025-12-06
  - Type: "cardio"
  - Duration: 20
  - Notes: "5K run"
- **Show the list grows** and both workouts appear.
- **Talking point:** "Each request is validated—date, type, and duration are required. If you skip them, you'll get a 400 error."

### 5. Highlight Key Features (30 seconds)
- **REST API Design:**
  - GET /api/workouts — list all
  - POST /api/workouts — create
  - PUT /api/workouts/:id — update (not shown in demo)
  - DELETE /api/workouts/:id — delete (not shown in demo)
  - Similar endpoints for `/api/goals`

- **Tech Stack:**
  - Node.js + Express backend
  - Jest + Supertest for testing (all tests pass)
  - Docker-ready
  - Modern development workflow with GitHub, CI, and AI tools

---

## Optional Extensions (if time permits)

### API via curl (if terminal is visible)
```powershell
# Get health
curl http://localhost:3000/health

# List workouts
curl http://localhost:3000/api/workouts

# Create a workout
curl -X POST http://localhost:3000/api/workouts `
  -H "Content-Type: application/json" `
  -d '{
    "date":"2025-12-07",
    "type":"swimming",
    "durationMinutes":45,
    "notes":"lap swimming"
  }'
```

### Test Suite (show quality)
```powershell
npm test
# Shows 3 passing tests confirming health, list, and create endpoints work
```

---

## Key Talking Points Summary
1. **Simple but complete REST API** — full CRUD for workouts and goals
2. **Modern tooling** — Jest tests, Docker, GitHub Actions ready
3. **Clean UI demo** — browser interface to interact with the API in real-time
4. **Scalable design** — easy to add database, authentication, validation libraries
5. **Demonstrable workflow** — shows code quality, testing, and deployment readiness

---

## Closing (15 seconds)
"This is a **modern training tracker API** built to showcase professional development practices: clean code, testing, Docker, and CI/CD. It's ready to scale to a full application with a database, user auth, and more advanced features. All code is on GitHub, and tests pass 100%."


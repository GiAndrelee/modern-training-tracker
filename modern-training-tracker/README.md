# Modern Training Tracker API

A small REST API that lets athletes track workouts and goals.  
This project is mainly used to demonstrate a modern development workflow using GitHub, Docker, CI, documentation, and AI assistance.

## Tech Stack

- Node.js + Express
- Jest + Supertest for tests
- Docker for containerization
- GitHub Actions for CI
- Confluence for documentation
- Jira (optional) for task tracking
- AI tools (ChatGPT / Copilot) for support and brainstorming

## Getting Started

```bash
npm install
npm run dev
# Visit http://localhost:3000/health
```

## Docker

```bash
docker build -t modern-training-tracker .
docker run -p 3000:3000 modern-training-tracker
```

## API Overview

- `GET /health` – service status
- `GET /api/workouts` – list workouts
- `POST /api/workouts` – create workout
- `PUT /api/workouts/:id` – update workout
- `DELETE /api/workouts/:id` – delete workout
- `GET /api/goals` – list goals
- `POST /api/goals` – create goal
- `PUT /api/goals/:id` – update goal
- `DELETE /api/goals/:id` – delete goal

## Final Prototype & Documentation

- **Live demo / video walkthrough:**
- 
- **Confluence project space:** **Confluence Space:**  
https://my-team-v5ajsx7k.atlassian.net/wiki/spaces/MTT/overview


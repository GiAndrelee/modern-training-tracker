const express = require("express");
const path = require("path");
const { execSync } = require('child_process');
const app = express();

app.use(express.json());

// Serve the demo frontend from the project's `demo` folder
app.use(express.static(path.join(__dirname, '..', 'demo')));

// Health metadata
const pkg = require(path.join(__dirname, '..', 'package.json'));
const START_TIME = Date.now();

const PORT = process.env.PORT || 3000;

// In-memory "database"
let workouts = [
  {
    id: 1,
    date: "2025-11-01",
    type: "basketball shooting",
    durationMinutes: 60,
    notes: "Form shooting, free throws, and spot-up threes."
  }
];

let goals = [
  {
    id: 1,
    title: "Make varsity team",
    targetDate: "2026-03-01",
    status: "in-progress"
  }
];

// Health check
app.get("/health", (req, res) => {
  const uptimeSeconds = Math.floor((Date.now() - START_TIME) / 1000);
  let gitSha = null;
  try {
    gitSha = execSync('git rev-parse --short HEAD').toString().trim();
  } catch (e) {
    // ignore - git may not be available in all environments
  }

  res.json({
    status: "ok",
    service: "modern-training-tracker",
    version: pkg.version,
    gitSha,
    uptime: uptimeSeconds,
    timestamp: new Date().toISOString()
  });
});

// ---- Workouts CRUD ----

// GET all workouts
app.get("/api/workouts", (req, res) => {
  res.json(workouts);
});

// POST create workout
app.post("/api/workouts", (req, res) => {
  const { date, type, durationMinutes, notes } = req.body;

  if (!date || !type || !durationMinutes) {
    return res.status(400).json({ error: "date, type, and durationMinutes are required" });
  }

  const newWorkout = {
    id: workouts.length ? workouts[workouts.length - 1].id + 1 : 1,
    date,
    type,
    durationMinutes,
    notes: notes || ""
  };

  workouts.push(newWorkout);
  res.status(201).json(newWorkout);
});

// PUT update workout
app.put("/api/workouts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const workout = workouts.find(w => w.id === id);

  if (!workout) {
    return res.status(404).json({ error: "Workout not found" });
  }

  const { date, type, durationMinutes, notes } = req.body;

  if (date !== undefined) workout.date = date;
  if (type !== undefined) workout.type = type;
  if (durationMinutes !== undefined) workout.durationMinutes = durationMinutes;
  if (notes !== undefined) workout.notes = notes;

  res.json(workout);
});

// DELETE workout
app.delete("/api/workouts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = workouts.findIndex(w => w.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Workout not found" });
  }

  workouts.splice(index, 1);
  res.status(204).send();
});

// ---- Goals CRUD ----

app.get("/api/goals", (req, res) => {
  res.json(goals);
});

app.post("/api/goals", (req, res) => {
  const { title, targetDate, status } = req.body;

  if (!title || !targetDate) {
    return res.status(400).json({ error: "title and targetDate are required" });
  }

  const newGoal = {
    id: goals.length ? goals[goals.length - 1].id + 1 : 1,
    title,
    targetDate,
    status: status || "in-progress"
  };

  goals.push(newGoal);
  res.status(201).json(newGoal);
});

app.put("/api/goals/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const goal = goals.find(g => g.id === id);

  if (!goal) {
    return res.status(404).json({ error: "Goal not found" });
  }

  const { title, targetDate, status } = req.body;

  if (title !== undefined) goal.title = title;
  if (targetDate !== undefined) goal.targetDate = targetDate;
  if (status !== undefined) goal.status = status;

  res.json(goal);
});

app.delete("/api/goals/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = goals.findIndex(g => g.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Goal not found" });
  }

  goals.splice(index, 1);
  res.status(204).send();
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;

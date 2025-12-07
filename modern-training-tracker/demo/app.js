async function checkHealth() {
  const res = await fetch('/health');
  const json = await res.json();
  document.getElementById('healthResult').textContent = JSON.stringify(json, null, 2);
}

async function fetchWorkouts() {
  const res = await fetch('/api/workouts');
  const json = await res.json();
  const list = document.getElementById('workoutList');
  list.innerHTML = '';
  json.forEach(w => {
    const li = document.createElement('li');
    li.textContent = `${w.id}: ${w.date} — ${w.type} (${w.durationMinutes} min)` + (w.notes ? ` — ${w.notes}` : '');
    list.appendChild(li);
  });
}

async function createWorkout(e) {
  e.preventDefault();
  const form = e.target;
  const data = {
    date: form.date.value,
    type: form.type.value,
    durationMinutes: Number(form.durationMinutes.value),
    notes: form.notes.value
  };

  const res = await fetch('/api/workouts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const json = await res.json();
  document.getElementById('createResult').textContent = JSON.stringify(json, null, 2);
  await fetchWorkouts();
  form.reset();
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('checkHealth').addEventListener('click', checkHealth);
  document.getElementById('refreshWorkouts').addEventListener('click', fetchWorkouts);
  document.getElementById('createWorkout').addEventListener('submit', createWorkout);
  // initial load
  checkHealth();
  fetchWorkouts();
});

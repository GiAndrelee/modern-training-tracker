const request = require("supertest");
const app = require("../src/server");

describe("Modern Training Tracker API", () => {
  it("GET /health should return ok", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });

  it("GET /api/workouts should return an array", async () => {
    const res = await request(app).get("/api/workouts");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /api/workouts should create a workout", async () => {
    const res = await request(app)
      .post("/api/workouts")
      .send({
        date: "2025-11-29",
        type: "weight training",
        durationMinutes: 45,
        notes: "upper body"
      });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.type).toBe("weight training");
  });
});

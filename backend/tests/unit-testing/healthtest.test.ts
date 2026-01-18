import request from "supertest";
import { app } from "../../server";
import { pool } from "../../database/pool";

afterAll(async () => {
  await pool.end();
});

describe("health endpoints", () => {
  it("GET /api/health returns OK", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "OK" });
  });

  it("GET /api/health/db reaches Postgres", async () => {
    const res = await request(app).get("/api/health/db");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("OK");
    expect(res.body.db).toEqual({ ok: 1 });
  });
});

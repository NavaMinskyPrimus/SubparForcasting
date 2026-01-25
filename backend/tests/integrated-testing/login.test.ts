import 'dotenv/config';
import request from 'supertest';
import { app } from "../../server";
import { pool } from "../../database/pool";

describe('Answers API Integration Tests', () => {
    describe('GET /api/login', () => {
        it('should log in existing user', async () => {
            const response = await request(app)
                .put('/api/login')
                .set("x-test-sub", "sub1")
                .send({})
                .expect(200);
            console.log(response.body)
            expect(response.body.name).toBe("Celine");
        });
    });
});

afterAll(async () => {
  await pool.end();
});
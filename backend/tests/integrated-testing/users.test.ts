import 'dotenv/config';
import request from 'supertest';
import { app } from "../../server";
import { pool } from "../../database/pool";

describe('Users API Integration Tests', () => {
    describe('GET /api/users', () => {
        it('should get all users', async () => {
            const response = await request(app)
                .get('/api/users')
                .send({})
                .expect(200);
            expect(response.body.length).toBe(3);
        });
    });
});

afterAll(async () => {
  await pool.end();
});
import 'dotenv/config';
import request from 'supertest';
import { app } from "../../server";
import { pool } from "../../database/pool";

describe('Answers API Integration Tests', () => {
    describe('GET /api/answers', () => {
        it('should get all answers', async () => {
            const response = await request(app)
                .get('/api/answers')
                .send({userid: 1})
                .expect(200);
            expect(response.body.length).toBe(2);
        });
    });
});

afterAll(async () => {
  await pool.end();
});
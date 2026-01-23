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
        it('should fail to post answer', async () => {
            await request(app)
                .post('/api/answers')
                .send({questionid: 1})
                .expect(400);
            await request(app)
                .post('/api/answers')
                .send({probability: 400, questionid: 1})
                .expect(400);
            await request(app)
                .post('/api/answers')
                .send({probability: 10, questionid: 400})
                .expect(404);
            await request(app)
                .post('/api/answers')
                .set("x-test-sub", "sub4")
                .send({probability: 10, questionid: 1})
                .expect(404);
        });
        it('should put an answer', async () => {
            await request(app)
                .post('/api/answers')
                .send({probability: 40, questionid: 1})
                .expect(200);
            const response1 = await request(app)
                .get('/api/answers')
                .send({userid: 2})
                .expect(200);
            expect(Array.isArray(response1.body)).toBe(true);
            const probs1 = response1.body.map((answer: any) => answer.probability);
            expect(probs1).toContain(40)
            await request(app)
                .post('/api/answers')
                .send({probability: 5, questionid: 1})
                .expect(200);
            const response2 = await request(app)
                .get('/api/answers')
                .send({userid: 2})
                .expect(200);
            const probs2 = response2.body.map((answer: any) => answer.probability);
            expect(probs2).toContain(5)

        });
    });
});

afterAll(async () => {
  await pool.end();
});
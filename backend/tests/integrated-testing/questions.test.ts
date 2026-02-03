import 'dotenv/config';
import request from 'supertest';
import { app } from "../../server";
import { pool } from "../../database/pool";

describe('Questions API Integration Tests', () => {
    describe('get tests', () => {
        it('should get question given id', async () => {
            const response = await request(app)
                .get('/api/questions')
                .send({questionid: 2})
                .expect(200);
            expect(response.body.text).toBe("Will my dog eat food tomorow")
        })
        it('should get question given id', async () => {
            const response = await request(app)
                .get('/api/questions/year')
                .send({year: 2010})
                .expect(200);
            expect(response.body[0].text).toBe("What are the chances i EAT YOU")
        })

    });
});
afterAll(async () => {
  await pool.end();
});
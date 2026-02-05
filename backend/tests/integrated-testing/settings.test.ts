import 'dotenv/config';
import request from 'supertest';
import { app } from "../../server";
import { pool } from "../../database/pool";


describe('Setting API Integration Tests', () => {
    it('should get the dates', async () => {
        const response = await request(app)
            .get('/api/settings/dates')
            .expect(200);
        console.log(response.body)
        expect(response.body.open).toBe("2026-01-02T00:00:00.000Z");
        expect(response.body.close).toBe("2026-01-09T00:00:00.000Z");
    });    
    it('should fail to change the dates', async () => {
        await request(app)
            .post('/api/settings/dates')
            .send({questions_close : "2026-01-02T00:00:00.000Z"})
            .expect(400);
        await request(app)
            .post('/api/settings/dates')
            .send({questions_open: "2026-01-02T00:00:00.000Z"})
            .expect(400);
        await request(app)
            .post('/api/settings/dates')
            .send({questions_open: "Hi!", questions_close : "2026-01-02T00:00:00.000Z"})
            .expect(400);
        await request(app)
            .post('/api/settings/dates')
            .send({questions_open: "2026-01-02T00:00:00.000Z", questions_close : "2026-01-02T00:00:00.000Z"})
            .expect(403);
        await request(app)
            .post('/api/settings/dates')
            .set("x-test-sub", "not-a-sub")
            .send({questions_open: "2026-01-02T00:00:00.000Z", questions_close : "2026-02-02T00:00:00.000Z"})
            .expect(404);
    });    
    it('should change the dates', async () => {
        const response_set = await request(app)
            .post('/api/settings/dates')
            .set("x-test-sub", "sub3")
            .send({questions_open: "2026-02-02T00:00:00.000Z", questions_close : "2026-02-09T00:00:00.000Z"})
            .expect(200);
        expect(response_set.body.open).toBe("2026-02-02T00:00:00.000Z");
        expect(response_set.body.close).toBe("2026-02-09T00:00:00.000Z");
        const response_reset = await request(app)
            .post('/api/settings/dates')
            .set("x-test-sub", "sub3")
            .send({questions_open: "2026-01-02T00:00:00.000Z", questions_close : "2026-01-09T00:00:00.000Z"})
            .expect(200);
        expect(response_reset.body.open).toBe("2026-01-02T00:00:00.000Z");
        expect(response_reset.body.close).toBe("2026-01-09T00:00:00.000Z");
    });
});

afterAll(async () => {
  await pool.end();
});
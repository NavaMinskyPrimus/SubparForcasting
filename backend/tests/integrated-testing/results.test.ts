import 'dotenv/config';
import request from 'supertest';
import { app } from "../../server";
import { pool } from "../../database/pool";

afterAll(async () => {
  await pool.end();
});

describe('Results API Integration Tests', () => {
    describe('get tests', () => {
        it('should fail without year param', async () => {
            await request(app)
                .get('/api/results')
                .set('x-test-sub', 'sub1')
                .expect(400);
        });

        it('should fail with invalid year', async () => {
            await request(app)
                .get('/api/results')
                .set('x-test-sub', 'sub1')
                .query({ year: 'abc' })
                .expect(400);
        });

        it('should return results for 2010', async () => {
            const response = await request(app)
                .get('/api/results')
                .set('x-test-sub', 'sub1')
                .query({ year: 2010 })
                .expect(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(2);
            const celine = response.body.find((r: any) => r.userid === 1);
            const ima = response.body.find((r: any) => r.userid === 2);
            expect(celine['user name']).toBe('Celine');
            expect(celine.score).toBeCloseTo(-1.6094379124341003, 5);
            expect(celine.confidence).toBeCloseTo(-10, 5);
            expect(ima['user name']).toBe('Ima');
            expect(ima.score).toBeCloseTo(0.5877866649021191, 5);
            expect(ima.confidence).toBeCloseTo(9.99, 2);
        });

        it('should return results for 2011 with null scores', async () => {
            const response = await request(app)
                .get('/api/results')
                .set('x-test-sub', 'sub1')
                .query({ year: 2011 })
                .expect(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(2);
            const userids = response.body.map((r: any) => r.userid);
            expect(userids).toContain(1);
            expect(userids).toContain(2);
            response.body.forEach((r: any) => {
                expect(r.score).toBeNull();
                expect(r.confidence).toBeNull();
            });
        });

        it('should return empty array for year with no results', async () => {
            const response = await request(app)
                .get('/api/results')
                .set('x-test-sub', 'sub1')
                .query({ year: 1999 })
                .expect(200);
            expect(response.body).toEqual([]);
        });
    });

    describe('POST /api/results/compute', () => {
        it('should fail a few things', async () => {
            await request(app)
                .post('/api/results/compute')
                .set('x-test-sub', 'sub1')
                .send({ year: 2010 })
                .expect(403);
            await request(app)
                .post('/api/results/compute')
                .set('x-test-sub', 'sub3')
                .send({})
                .expect(400);
            await request(app)
                .post('/api/results/compute')
                .set('x-test-sub', 'sub3')
                .send({ year: 'abc' })
                .expect(400);
            await request(app)
                .post('/api/results/compute')
                .set('x-test-sub', 'sub3')
                .send({ year: -1 })
                .expect(400);
            await request(app)
                .post('/api/results/compute')
                .set('x-test-sub', 'sub3')
                .send({ year: 2011 })
                .expect(400);
        });

        it('should compute and return results for 2010', async () => {
            const response = await request(app)
                .post('/api/results/compute')
                .set('x-test-sub', 'sub3')
                .send({ year: 2010 })
                .expect(200);
            expect(Array.isArray(response.body)).toBe(true);
            // both Celine (p=10, true) and Ima (p=90, true) have 2010 answers
            expect(response.body.length).toBe(2);
            const celine = response.body.find((r: any) => r.userid === 1);
            expect(celine).toBeDefined();
            expect(celine['user name']).toBe('Celine');
            expect(celine.year).toBe(2010);
            // ln(0.10) - ln(0.5)
            expect(celine.score).toBeCloseTo(-1.6094379124341003, 5);
            expect(celine.confidence).toBeCloseTo(-10, 5);
            const ima = response.body.find((r: any) => r.userid === 2);
            expect(ima).toBeDefined();
            expect(ima['user name']).toBe('Ima');
            expect(ima.year).toBe(2010);
            // ln(0.90) - ln(0.5)
            expect(ima.score).toBeCloseTo(0.5877866649021191, 5);
            expect(ima.confidence).toBeCloseTo(9.99, 2);
        });

        it('GET should reflect 2010 scores', async () => {
            const response = await request(app)
                .get('/api/results')
                .set('x-test-sub', 'sub1')
                .query({ year: 2010 })
                .expect(200);
            expect(response.body.length).toBe(2);
            const celine = response.body.find((r: any) => r.userid === 1);
            expect(celine).toBeDefined();
            expect(celine.score).toBeCloseTo(-1.6094379124341003, 5);
            const ima = response.body.find((r: any) => r.userid === 2);
            expect(ima).toBeDefined();
            expect(ima.score).toBeCloseTo(0.5877866649021191, 5);
        });
    });

    describe('2011 compute (resolve, score, cleanup)', () => {
        it('should resolve questions 2 and 3', async () => {
            await request(app)
                .put('/api/questions')
                .set('x-test-sub', 'sub3')
                .send({ questionid: 2, text: 'Will my dog eat food tomorow', result: true })
                .expect(200);
            await request(app)
                .put('/api/questions')
                .set('x-test-sub', 'sub3')
                .send({ questionid: 3, text: 'Will I finish my homework', result: true })
                .expect(200);
            const q2 = await request(app).get('/api/questions').query({ questionid: 2 }).expect(200);
            const q3 = await request(app).get('/api/questions').query({ questionid: 3 }).expect(200);
            expect(q2.body.result).toBe(true);
            expect(q3.body.result).toBe(true);
        });

        it('should compute results for 2011', async () => {
            const response = await request(app)
                .post('/api/results/compute')
                .set('x-test-sub', 'sub3')
                .send({ year: 2011 })
                .expect(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(1);
            const celine = response.body.find((r: any) => r.userid === 1);
            expect(celine).toBeDefined();
            expect(celine['user name']).toBe('Celine');
            expect(celine.year).toBe(2011);
            expect(celine.score).toBeCloseTo(-1.6144630803608504, 5);
            expect(typeof celine.confidence).toBe('number');
            expect(isFinite(celine.confidence)).toBe(true);
            expect(celine.confidence).toBe(0);
        });

        it('GET /api/results should reflect 2011 scores', async () => {
            const response = await request(app)
                .get('/api/results')
                .set('x-test-sub', 'sub1')
                .query({ year: 2011 })
                .expect(200);
            const celine = response.body.find((r: any) => r.userid === 1);
            expect(celine).toBeDefined();
            expect(celine.score).toBeCloseTo(-1.6144630803608504, 5);
            const ima = response.body.find((r: any) => r.userid === 2);
            expect(ima).toBeDefined();
            expect(ima.score).toBeNull();
        });

        it('should clean up: un-resolve questions 2 and 3, reset 2011 results', async () => {
            await pool.query(`UPDATE questions SET result = null WHERE questionid IN (2, 3)`);
            const q2 = await request(app).get('/api/questions').query({ questionid: 2 }).expect(200);
            const q3 = await request(app).get('/api/questions').query({ questionid: 3 }).expect(200);
            expect(q2.body.result).toBeNull();
            expect(q3.body.result).toBeNull();

            await pool.query(
                `UPDATE results SET confidence = null, score = null WHERE userid = 1 AND year = 2011`
            );
            await pool.query(`UPDATE settings SET released_year = 2010`);
            const results = await request(app)
                .get('/api/results')
                .set('x-test-sub', 'sub1')
                .query({ year: 2011 })
                .expect(200);
            results.body.forEach((r: any) => {
                expect(r.score).toBeNull();
                expect(r.confidence).toBeNull();
            });
        });
    });
});

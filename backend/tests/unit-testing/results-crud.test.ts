require('dotenv').config();
import { pool } from './../../database/pool';
import { upsertResult, getResultsByYear } from '../../database/results-queries';

afterAll(async () => {
  await pool.end();
});

describe('Database CRUD tests for results queries', () => {
    describe('getResultsByYear', () => {
        it('should return results for 2010 with Celine and Ima', async () => {
            const results = await getResultsByYear(2010);
            expect(Array.isArray(results)).toBe(true);
            expect(results.length).toBe(2);
            // results are ORDER BY score DESC, so Ima (0.255) comes before Celine (-0.699)
            const celine = results.find((r: any) => r.userid === 1) as any;
            const ima = results.find((r: any) => r.userid === 2) as any;
            expect(celine).toBeDefined();
            expect(celine['user name']).toBe('Celine');
            expect(celine.year).toBe(2010);
            expect(celine.score).toBeCloseTo(-1.6094379124341005, 5);
            expect(celine.confidence).toBeCloseTo(-10, 5);
            expect(ima).toBeDefined();
            expect(ima['user name']).toBe('Ima');
            expect(ima.year).toBe(2010);
            // log10(0.90) - log10(0.5) = log10(1.8)
            expect(ima.score).toBeCloseTo(0.5877866649021191, 5);
            expect(ima.confidence).toBeCloseTo(9.99, 2);
        });
        it('should return results for 2011', async () => {
            const results = await getResultsByYear(2011);
            expect(Array.isArray(results)).toBe(true);
            expect(results.length).toBe(2);
            const userids = results.map((r: any) => r.userid);
            expect(userids).toContain(1);
            expect(userids).toContain(2);
            results.forEach((r: any) => {
                expect(r.score).toBeNull();
                expect(r.confidence).toBeNull();
            });
        });
        it('should return empty array for a year with no results', async () => {
            const results = await getResultsByYear(1999);
            expect(Array.isArray(results)).toBe(true);
            expect(results.length).toBe(0);
        });
    });

    describe('upsertResult', () => {
        it('should insert a new result', async () => {
            const result = await upsertResult(1, 'Celine', 2009, 1.5, -0.5);
            expect(result.userid).toBe(1);
            expect(result['user name']).toBe('Celine');
            expect(result.year).toBe(2009);
            expect(result.confidence).toBeCloseTo(1.5, 5);
            expect(result.score).toBeCloseTo(-0.5, 5);
        });

        it('should update an existing result on conflict', async () => {
            const updated = await upsertResult(1, 'Celine', 2009, 2.0, -0.25);
            expect(updated.userid).toBe(1);
            expect(updated.year).toBe(2009);
            expect(updated.confidence).toBeCloseTo(2.0, 5);
            expect(updated.score).toBeCloseTo(-0.25, 5);
            // confirm only one row exists for this userid/year
            const results = await getResultsByYear(2009);
            expect(results.filter((r: any) => r.userid === 1).length).toBe(1);
        });

        it('should support null confidence and score', async () => {
            const result = await upsertResult(2, 'Ima', 2009, null as any, null as any);
            expect(result.userid).toBe(2);
            expect(result.year).toBe(2009);
            expect(result.score).toBeNull();
            expect(result.confidence).toBeNull();
        });

        it('should clean up inserted test rows', async () => {
            await pool.query(`DELETE FROM results WHERE year = 2009`);
            const results = await getResultsByYear(2009);
            expect(results.length).toBe(0);
        });
    });
});

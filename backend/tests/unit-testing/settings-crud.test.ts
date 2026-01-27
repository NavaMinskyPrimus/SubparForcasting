require('dotenv').config();
import { getSettings, setCloseDate, setOpenDate } from '../../database/settings-queries';
import { pool } from './../../database/pool';
import { describe } from 'node:test';

afterAll(async () => {
  await pool.end();
});

describe('Database CRUD tests for settings', () => {
    it('get test', async () => {
        const dates = await getSettings();
        expect(dates).toBeDefined();
        expect(dates.questions_open.toISOString()).toBe("2026-01-02T00:00:00.000Z");
        expect(dates.questions_close.toISOString()).toBe("2026-01-09T00:00:00.000Z");
    });
    it('change open date', async () => {
        await setOpenDate(new Date("2026-02-02T00:00:00.000Z"));
        const dates1 = await getSettings();
        expect(dates1).toBeDefined();
        expect(dates1.questions_open.toISOString()).toBe("2026-02-02T00:00:00.000Z");
        expect(dates1.questions_close.toISOString()).toBe("2026-01-09T00:00:00.000Z");
        await setOpenDate(new Date("2026-01-02T00:00:00.000Z"));
        const dates2 = await getSettings();
        expect(dates2).toBeDefined();
        expect(dates2.questions_open.toISOString()).toBe("2026-01-02T00:00:00.000Z");
        expect(dates2.questions_close.toISOString()).toBe("2026-01-09T00:00:00.000Z");
    });
    it('change close date', async () => {
        await setCloseDate(new Date("2026-02-09T00:00:00.000Z"));
        const dates1 = await getSettings();
        expect(dates1).toBeDefined();
        expect(dates1.questions_open.toISOString()).toBe("2026-01-02T00:00:00.000Z");
        expect(dates1.questions_close.toISOString()).toBe("2026-02-09T00:00:00.000Z");
        await setCloseDate(new Date("2026-01-09T00:00:00.000Z"));
        const dates2 = await getSettings();
        expect(dates2).toBeDefined();
        expect(dates2.questions_open.toISOString()).toBe("2026-01-02T00:00:00.000Z");
        expect(dates2.questions_close.toISOString()).toBe("2026-01-09T00:00:00.000Z");
    });
});

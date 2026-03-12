import { pool } from './pool';

export type Result = {
  userid: number;
  'user name': string;
  year: number;
  confidence: number;
  score: number;
};

export async function upsertResult(
  userid: number,
  userName: string,
  year: number,
  confidence: number,
  score: number
): Promise<Result> {
  const res = await pool.query(
    `INSERT INTO public."results" (userid, "user name", year, confidence, score)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (userid, year) DO UPDATE
       SET "user name" = EXCLUDED."user name",
           confidence  = EXCLUDED.confidence,
           score       = EXCLUDED.score
     RETURNING *`,
    [userid, userName, year, confidence, score]
  );
  return res.rows[0];
}

export async function getResultsByYear(year: number): Promise<Result[]> {
  const res = await pool.query(
    `SELECT * FROM public."results" WHERE year = $1 ORDER BY score DESC`,
    [year]
  );
  return res.rows;
}

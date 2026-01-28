
import { pool } from './pool';
import type { PoolClient } from "pg";

export async function deleteAnswersByUID(userid: number){
  const query = `DELETE from public."answers" WHERE userid = $1 RETURNING *`;
  const value = [userid]
  const res = await pool.query(query, value);
  return res.rows;
}

export async function deleteAnswer(userid: number,questionid: number){
  const query = `DELETE from public."answers" WHERE userid = $1 AND questionid = $2 RETURNING *`;
  const value = [userid,questionid]
  const res = await pool.query(query, value);
  return res.rows[0] ?? null;
}
export async function postAnswer(userid: number, questionid: number, probability: number){
    const query = `
    INSERT INTO public."answers" (userid, questionid, probability)
    VALUES ($1, $2, $3)
    ON CONFLICT (userid, questionid)
    DO UPDATE SET
      probability = EXCLUDED.probability
    RETURNING *;
  `;
    const values = [userid, questionid, probability];
    const res = await pool.query(query, values);
    return res.rows[0];
}
export async function getAnswersByUID(userid: number){
  const res = await pool.query('SELECT * FROM public."answers" WHERE userid = $1;', [userid]);
  return res.rows;
}

export async function checkAnswer(userid: number, questionid: number){
  const res = await pool.query('SELECT * FROM public."answers" WHERE userid = $1 AND questionid = $2;', [userid, questionid]);
  return res.rows[0] ?? null;
}
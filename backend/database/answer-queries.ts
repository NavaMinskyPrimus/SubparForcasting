
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
export async function getAnswersByQID(qid: number){
  const res = await pool.query('SELECT * FROM public."answers" WHERE questionid = $1;', [qid]);
  return res.rows;
}

export async function checkAnswer(userid: number, questionid: number){
  const res = await pool.query('SELECT * FROM public."answers" WHERE userid = $1 AND questionid = $2;', [userid, questionid]);
  return res.rows[0] ?? null;
}
export type Answer = {
  userid: number;
  questionid: number;
  probability: number;
};

export async function postAnswers(answers: {userid: number; questionid: number;probability: number;}[]) :  Promise<Answer[]>{
  if (answers.length === 0){
    return [];
  }
  const values: number[] = [];
  const text: string[] = [];

  answers.forEach((a, index) => {
    const baseIndex = index * 3;
    text.push(
      `($${baseIndex + 1}, $${baseIndex + 2}, $${baseIndex + 3})`
    );

    values.push(a.userid, a.questionid, a.probability);
  });

  const query = `
    INSERT INTO public."answers" (userid, questionid, probability)
    VALUES ${text.join(", ")}
    ON CONFLICT (userid, questionid)
    DO UPDATE SET
      probability = EXCLUDED.probability
    RETURNING *;
  `;

  const res = await pool.query(query, values);
  return res.rows;
}
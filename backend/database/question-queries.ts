import { pool } from './pool';
import type { PoolClient } from "pg";

export type Question = {
  questionid: number;
  text: string;
  year: number;
  result: boolean | null;
  isvalid: boolean;
};

export async function getQuestion(qid: number){
  const res = await pool.query('SELECT * FROM public."questions" WHERE questionid = $1;', [qid]);
  return res.rows[0]||null;
}
export async function getQuestionsByYear(year: number){
  const res = await pool.query('SELECT * FROM public."questions" WHERE year = $1;', [year]);
  return res.rows;
}
export async function postQuestion(text: string, year: number){
  const query = `
    INSERT INTO public."questions" (text, year,result, isvalid)
    VALUES ($1, $2, $3, $4)
    RETURNING *;`;
  const res =  await pool.query(query, [text,year, null, true]);
  return res.rows[0] || null;
}

export async function changeValidation(qid: number, validation: boolean){
  const query = `      
    UPDATE public."questions"
      SET 
          isvalid = $2
      WHERE questionid = $1
    RETURNING *;`;
  const res =  await pool.query(query, [qid,validation]);
  return res.rows[0] || null;
}

export async function putQuestion(qid: number, text: string, result: boolean | null){
  let args;
  let query;
  if(result == null){
    query = `
      UPDATE public."questions"
      SET 
          text = $2
      WHERE questionid = $1
      RETURNING *;
    `
    args = [qid, text]
  }else{
    query = `
      UPDATE public."questions"
      SET 
          text = $2,
          result = $3
      WHERE questionid = $1
      RETURNING *;
    `
    args = [qid, text, result]
  }
  const res = await pool.query(query, args);
  return res.rows[0] || null;
}
export async function deleteQuestionWithAssociatedAnswers(qid:number){
  const client: PoolClient = await pool.connect();

  try {
    await client.query("BEGIN");
    await client.query(
      `DELETE FROM public."answers" WHERE questionid = $1`,
      [qid]
    );
    const user = await client.query(
      `DELETE FROM public."questions" WHERE questionid = $1 RETURNING *`,
      [qid]
    );
    await client.query("COMMIT");
    return user.rows[0] || null;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}
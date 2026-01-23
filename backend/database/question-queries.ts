import { pool } from './pool';
export async function getQuestion(qid: number){
  const res = await pool.query('SELECT * FROM public."answers" WHERE questionid = $1;', [qid]);
  return res.rows[0]||null;
}


import { pool } from './pool';

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
  return res.rows[0];
}
export async function postAnswer(userid: number, questionid: number, probability: number){
    const query = `
        INSERT INTO public."answers" (userid, questionid, probability)
        VALUES ($1, $2, $3)
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

export async function putAnswer(userid: number, questionid: number, probability: number){
    const query = `UPDATE public."answers"
    SET 
        probability = $3
    WHERE userid = $1 AND questionid = $2
    RETURNING *;
    `;
    const values =  [userid, questionid, probability];
    const res = await pool.query(query, values);
    return res.rows[0];
}

export async function checkAnswer(userid: number, questionid: number){
  const res = await pool.query('SELECT * FROM public."answers" WHERE userid = $1 AND questionid = $2;', [userid, questionid]);
  return res.rows[0] || null;
}

import { pool } from './pool';

export async function getSettings(){
  const query = `SELECT * FROM public."settings" WHERE id = $1`;
  const value = [true];
  const res = await pool.query(query, value);
  return res.rows[0];
}

export async function setDates(open_date: Date, close_date: Date){
  const query = `UPDATE public."settings"
    SET 
       questions_open = $2,
       questions_close = $3
    WHERE id = $1
    RETURNING *;
    `;
  const value = [true, open_date,close_date];
  const res = await pool.query(query, value);
  return res.rows[0];
}

export async function setOpenDate(date: Date){
  const query = `UPDATE public."settings"
    SET 
       questions_open = $2
    WHERE id = $1
    RETURNING *;
    `;
  const value = [true, date];
  const res = await pool.query(query, value);
  return res.rows[0];
}
export async function setCloseDate(date: Date){
  const query = `UPDATE public."settings"
    SET 
        questions_close = $2
    WHERE id = $1
    RETURNING *;
    `;
  const value = [true, date];
  const res = await pool.query(query, value);
  return res.rows[0];
}
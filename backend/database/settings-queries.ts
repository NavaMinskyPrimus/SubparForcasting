
import { pool } from './pool';
import type { PoolClient } from "pg";

export async function getSettings(){
  const query = `SELECT * FROM public."settings" WHERE id = $1`;
  const value = [true];
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
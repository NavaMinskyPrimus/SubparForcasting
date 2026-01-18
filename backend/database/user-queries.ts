import { pool } from './pool';

export async function getUsers() {
  const res = await pool.query('SELECT * FROM public."users";');
  return res.rows;
}

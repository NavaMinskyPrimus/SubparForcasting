import { pool } from './pool';

export async function getUsers() {
  const res = await pool.query('SELECT * FROM public."users";');
  return res.rows;
}

export async function getUserByID(userid: number) {
  const res = await pool.query('SELECT * FROM public."users" WHERE userid = $1;', [userid]);
  return res.rows[0] || null;
}

export async function postUser(
  name: string,
  email: string,
  permission: 'admin' | 'user'
) {
  const query = `
    INSERT INTO public."users" (userid, name, email, permission)
    VALUES ((SELECT COALESCE(MAX("userid"), 0) + 1 FROM public."users"), $1, $2, $3)
    RETURNING *;
  `;
  
  const values = [name, email, permission];
  const res = await pool.query(query, values)
  
  return res.rows[0];
}

export async function deleteUserByID(userid: number){
  const query = `DELETE from public."users" WHERE userid = $1 RETURNING *`;
  const value = [userid]
  const res = await pool.query(query, value);
  return res.rows[0];
}
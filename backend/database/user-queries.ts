import { pool } from './pool';
import type { PoolClient } from "pg";

export async function getUsers() {
  const res = await pool.query('SELECT * FROM public."users";');
  return res.rows;
}

export async function getUserByID(userid: number) {
  const res = await pool.query('SELECT * FROM public."users" WHERE userid = $1;', [userid]);
  return res.rows[0] ?? null;
}



export async function getUserBySub(sub: string) {
  const res = await pool.query('SELECT * FROM public."users" WHERE sub = $1;', [sub]);
  return res.rows[0] ?? null;
}

export async function postUser(
  name: string,
  email: string,
  permission: 'admin' | 'user',
  sub: string
) {
  const query = `
    INSERT INTO public."users" (name, email, permission,sub)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  
  const values = [name, email, permission, sub];
  const res = await pool.query(query, values)
  
  return res.rows[0];
}

export async function deleteUserWithAssociatedAnswers(userid: number) {
  const client: PoolClient = await pool.connect();

  try {
    await client.query("BEGIN");
    await client.query(
      `DELETE FROM public."answers" WHERE userid = $1`,
      [userid]
    );
    const user = await client.query(
      `DELETE FROM public."users" WHERE userid = $1 RETURNING *`,
      [userid]
    );
    await client.query("COMMIT");
    return user.rows[0] ?? null;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

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
export async function getUserByEmail(email: string) {
  const res = await pool.query('SELECT * FROM public."users" WHERE email = $1;', [email]);
  return res.rows[0] ?? null;
}

export async function postUser(
  name: string,
  email: string,
  permission: 'admin' | 'user',
  sub: string | null
) {
  try {
    const res = await pool.query(`
      INSERT INTO public."users" (name, email, permission, sub)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (sub) DO UPDATE SET
        name = EXCLUDED.name,
        email = EXCLUDED.email,
        permission = EXCLUDED.permission
      RETURNING *;
    `, [name, email, permission, sub]);
    return res.rows[0];
  } catch (err: any) {
    if (err.constraint === 'users_email_unique') {
      console.log("here")
      const res = await pool.query(`
        UPDATE public."users"
        SET name = $1, sub = $3, permission = $4
        WHERE email = $2
        RETURNING *;
      `, [name, email, sub, permission]);
      return res.rows[0];
    }
    throw err;
  }
}

export async function addSubToUser(
  name: string,
  email: string,
  permission: 'admin' | 'user',
  sub: string
) {
  const res = await pool.query(
  `UPDATE public."users"                                                                                                      
    SET name = $1, sub = $3, permission = $4
    WHERE email = $2                                                                                                           
    RETURNING *;`,
    [name, email, sub, permission]
  );     
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
    await client.query(
      `DELETE FROM public."results" WHERE userid = $1`,
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

require('dotenv').config();
import { pool } from './../../database/pool';
import { getUsers} from '../../database/user-queries';

afterAll(async () => {
  await pool.end();
});

describe('Database CRUD tests for user queries', () => {
    it('should get all users', async () => {
        const users = await getUsers();
        expect(users.length).toBe(3);
    });
});
require('dotenv').config();
import { pool } from './../../database/pool';
import {addSubToUser, deleteUserWithAssociatedAnswers, getUserByID, getUsers, postUser} from '../../database/user-queries';

afterAll(async () => {
  await pool.end();
});

describe('Database CRUD tests for user queries', () => {
    let id : number;
    it('should get all users', async () => {
        const users = await getUsers();
        expect(users.length).toBe(3);
    });
    it('should post a user', async () => {
        const inserted = await postUser("Test User","test@user.org", "user", "testsub");
        id = inserted.userid
        console.log(inserted);
        expect(typeof id).toBe('number');
        const user = await getUserByID(id);
        expect(user.userid).toBe(id);           // or user.user_id
        expect(user.email).toBe('test@user.org');
        expect(user.permission).toBe('user');
    });
    it('should remove a user', async () => {
        const user = await deleteUserWithAssociatedAnswers(id);
        expect(user.userid).toBe(id);
        expect(user.email).toBe('test@user.org');
        expect(user.permission).toBe('user');
        const users = await getUsers();
        expect(users.length).toBe(3);
    });
});

describe('addSubToUser', () => {
    let id: number;
    it('should add a sub to a sub-less user', async () => {
        const inserted = await postUser("No Sub User", "nosub@test.org", "user", null);
        id = inserted.userid;
        expect(inserted.sub).toBeNull();

        const updated = await addSubToUser("No Sub User", "nosub@test.org", "user", "newuniquesub");
        expect(updated.userid).toBe(id);
        expect(updated.sub).toBe("newuniquesub");
        expect(updated.email).toBe("nosub@test.org");
    });
    it('should clean up the sub-less user', async () => {
        const deleted = await deleteUserWithAssociatedAnswers(id);
        expect(deleted.userid).toBe(id);
        expect(deleted.email).toBe("nosub@test.org");
    });
});
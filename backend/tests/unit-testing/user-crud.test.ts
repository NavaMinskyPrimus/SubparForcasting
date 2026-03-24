require('dotenv').config();
import { pool } from './../../database/pool';
import {addSubToUser, deleteUserWithAssociatedAnswers, getUserByID, getUsers, postUser} from '../../database/user-queries';
import { describe } from 'node:test';
import { addAveragy, Answer, deleteAnswer, getAnswersByUID } from '../../database/answer-queries';

afterAll(async () => {
  await pool.end();
});

describe('Database CRUD tests for user queries', () => {
    describe('standard crud', () => {
        let id : number;
        it('should get all users', async () => {
            const users = await getUsers();
            expect(users.length).toBe(4);
        });
        it('should post a user', async () => {
            const inserted = await postUser("user-crud test user 1","test@user.org", "user", "testsub");
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
            expect(users.length).toBe(4);
        });
    })
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
    describe('Averagy', async () =>{
        it('should add averagy for 2011', async () =>{
            await addAveragy(2011);
            const averagy_answers = await getAnswersByUID(4);
            expect(Array.isArray(averagy_answers)).toBe(true);
            console.log(averagy_answers)
            expect(averagy_answers.length).toBe(2);
            console.log(averagy_answers);
        })
        it('should remove averagy answers', async () =>{
            const averagy_answer = await getAnswersByUID(4);
            for(const ans of averagy_answer){
                await deleteAnswer(ans.userid, ans.questionid)
            }
            const averagy_answer_empty = await getAnswersByUID(4);
            expect(Array.isArray(averagy_answer_empty)).toBe(true);
            expect(averagy_answer_empty.length).toBe(0);        
        })
    })
});
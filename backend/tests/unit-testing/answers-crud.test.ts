require('dotenv').config();
import { pool } from './../../database/pool';
import { deleteAnsewersByUID, deleteAnswer, getAnswersByUID, postAnswer} from '../../database/answer-queries';
import { describe } from 'node:test';
import { deleteUserByID, getUserByID, postUser } from '../../database/user-queries';

afterAll(async () => {
  await pool.end();
});



describe('Database CRUD tests for user queries', () => {
    let id : number;
    describe('basic tests', () => {
        it('should get all answers for user 2', async () => {
            const answers = await getAnswersByUID(1);
            expect(answers).toBeDefined();
            expect(Array.isArray(answers)).toBe(true);
            const questionids = answers.map((answer: any) => answer.questionid);
            expect(questionids).toContain(1);
            expect(questionids).toContain(2);
        });
        it('should post an answer', async () => {
            const inserted = await postAnswer(2,2, 50);
            const uid = inserted.userid;
            const qid = inserted.questionid;
            console.log(inserted);
            expect(typeof uid).toBe('number');
            expect(uid).toBe(2);
            expect(qid).toBe(2);
            const answers = await getAnswersByUID(uid);
            const questionids = answers.map((answer: any) => answer.questionid);
            expect(questionids).toContain(2);
        });
        it('should delete that answer', async () => {
            const deleted = await deleteAnswer(2,2);
            const uid = deleted.userid;
            const qid = deleted.questionid;
            console.log(deleted);
            expect(typeof uid).toBe('number');
            expect(typeof qid).toBe('number');
            const answers = await getAnswersByUID(uid);
            const questionids = answers.map((answer: any) => answer.questionid);
            expect(questionids).not.toContain(2);
        });
    });
    describe('deleteAnsewersByUID tests', () => {
        let uid: number;
        it('should post a new user', async () => {
            const user1 = await postUser("Test User", "test@user.com", "admin", "testsub");
            uid = user1.userid;
            const user2 = await getUserByID(uid);
            expect(user2.userid).toBe(uid);           // or user.user_id
            expect(user2.email).toBe('test@user.com');
            expect(user2.permission).toBe('admin');
            expect(user2.name).toBe('Test User');
        });
        it('should add answers for that user', async () => {
            await postAnswer(uid, 1, 10);
            await postAnswer(uid, 2, 70);
            const answers = await getAnswersByUID(uid);
            const probs = answers.map((answer: any) => answer.probability);
            expect(probs).toContain(10);
            expect(probs).toContain(70);
        });
        it('should remove all answers by user', async () => {
            const removed = await deleteAnsewersByUID(uid);
            expect(Array.isArray(removed)).toBe(true);
            const removed_qids =  removed.map((answer: any) => answer.probability);
            expect(removed_qids).toContain(10);
            expect(removed_qids).toContain(70);
            const remaining = await getAnswersByUID(uid);
            expect(remaining.length).toBe(0);
        });
        it('should remove added user', async () => {
            const removed = await deleteUserByID(uid);
            const user = await getUserByID(uid);
            expect(user).toBe(null)
        });
    });
});
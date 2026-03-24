require('dotenv').config();
import { pool } from './../../database/pool';
import { describe } from 'node:test';
import { deleteUserWithAssociatedAnswers, getUserByID, postUser } from '../../database/user-queries';
import { deleteAnswersByUID, deleteAnswer, getAnswersByUID, postAnswer, getAnswersByQID, postAnswers, checkAnswer} from '../../database/answer-queries';

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
        it('should get all answers for question 1', async () =>{
            const answers = await getAnswersByQID(1);
            expect(answers).toBeDefined();
            expect(Array.isArray(answers)).toBe(true);
            const userids = answers.map((answer: any) => answer.userid);
            expect(userids).toContain(1);
            expect(userids).toContain(2);
        })
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
        let returnedanswers = []
        it('should add multiple answers', async() =>{
            const answers = [
            { userid: 2, questionid: 2, probability: 49 },
            { userid: 1, questionid: 1, probability: 50 },
            ];
            const added = await postAnswers(answers);
            expect(added.length).toBe(2);
            const answer1 = added.find(a => a.userid === 2 && a.questionid === 2);
            const answer2 = added.find(a => a.userid === 1 && a.questionid === 1);
            expect(answer1).toBeDefined();
            expect(answer2).toBeDefined();
            const check1 = await checkAnswer(2,2);
            expect(check1).toBeDefined()
            expect(check1).not.toBe(null)
            expect(check1.probability).toBe(49)
            const check2 = await checkAnswer(1,1);
            expect(check2).toBeDefined()
            expect(check2.probability).toBe(50)
        });
        it('should reset data', async () => {
            const removed = await deleteAnswer(2,2);
            const added = await postAnswers([{ userid: 1, questionid: 1, probability: 10 }]);

        })
    });
    describe('deleteAnswersByUID tests', () => {
        let uid: number;
        it('should post a new user', async () => {
            const user1 = await postUser("answer crud Test User", "test@user.com", "admin", "testsub");
            uid = user1.userid;
            const user2 = await getUserByID(uid);
            expect(user2.userid).toBe(uid);           // or user.user_id
            expect(user2.email).toBe('test@user.com');
            expect(user2.permission).toBe('admin');
            expect(user2.name).toBe('answer crud Test User');
        });
        it('should add answers for that user', async () => {
            await postAnswer(uid, 1, 10);
            await postAnswer(uid, 2, 70);
            const answers = await getAnswersByUID(uid);
            const probs = answers.map((answer: any) => answer.probability);
            expect(probs).toContain(10);
            expect(probs).toContain(70);
        });
        it('should remove added user with answers', async () => {
            const removed = await deleteUserWithAssociatedAnswers(uid);
            const user = await getUserByID(uid);
            expect(user).toBe(null)
            const remaining  = await getAnswersByUID(uid);
            expect(remaining.length).toBe(0);
        });
    });
});
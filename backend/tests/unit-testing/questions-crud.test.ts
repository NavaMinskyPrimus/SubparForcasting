require('dotenv').config();
import { pool } from './../../database/pool';
import { describe } from 'node:test';
import { getQuestion, getQuestionsByYear, postQuestion, putQuestion } from '../../database/question-queries';

describe('Database CRUD tests for questions', () => {
    describe('get tests', () => {
        it('get question specific', async () => {
            const question = await getQuestion(1);
            expect(question).not.toBe(null);
            const text = question.text;
            expect(text).toBe("What are the chances i EAT YOU");
        });
        it('get by year', async () =>{
            const questions2010 = await getQuestionsByYear(2010);
            expect(Array.isArray(questions2010)).toBe(true);
            const questionids2010 = questions2010.map((q: any) => q.questionid);
            expect(questionids2010).toContain(1);
            expect(questionids2010).not.toContain(2);
            const questions2011 = await getQuestionsByYear(2011);
            expect(Array.isArray(questions2011)).toBe(true);
            const questionids2011 = questions2011.map((q: any) => q.questionid);
            expect(questionids2011).toContain(2);
            expect(questionids2011).not.toContain(1);
        });
    });
    describe('post, put, delete tests', async () => {
        let qid : number;
        it('post question', async () =>{
            const newQuestion = await postQuestion("Did this work?", 2020)
            expect(newQuestion).not.toBe(null)
            expect(newQuestion.text).toBe("Did this work?")
            expect(newQuestion.year).toBe(2020)
            qid = newQuestion.questionid
            const questionCopy = await getQuestion(qid);
            expect(questionCopy.text).toBe(newQuestion.text)
            expect(questionCopy.year).toBe(newQuestion.year)
            expect(questionCopy.questionid).toBe(newQuestion.questionid)
        })
        it('put on nonexistant question', async () => {
            const noupdate = await putQuestion(30,"doesn't exist");
            expect(noupdate).toBe(null)
            const check = await getQuestion(30);
            expect(check).toBe(null)
        })
        it('real put', async () => {
            const questionUpdated = await putQuestion(qid, "did it update?")
            expect(questionUpdated).not.toBe(null)
            expect(questionUpdated.text).toBe("did it update?")
            expect(questionUpdated.year).toBe(2020)
            expect(questionUpdated.questionid).toBe(qid)
            const questionCopy = await getQuestion(qid);
            expect(questionCopy.text).toBe("did it update?")
            expect(questionCopy.year).toBe(questionUpdated.year)
            expect(questionCopy.questionid).toBe(questionUpdated.questionid)
        })
    });
});


afterAll(async () => {
  await pool.end();
});
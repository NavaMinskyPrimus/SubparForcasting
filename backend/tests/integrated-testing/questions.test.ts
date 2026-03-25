import 'dotenv/config';
import request from 'supertest';
import { app } from "../../server";
import { pool } from "../../database/pool";
import { describe } from 'node:test';

describe('Questions API Integration Tests', () => {
    describe('get tests', () => {
        it('should get question given id', async () => {
            const response = await request(app)
                .get('/api/questions')
                .query({questionid: 2})
                .expect(200);
            expect(response.body.text).toBe("Will my dog eat food tomorow")
            expect(response.body.isvalid)
        })
        it('should get question year', async () => {
            const response = await request(app)
                .get('/api/questions/year')
                .query({year: 2010})
                .expect(200);
            expect(response.body[0].text).toBe("What are the chances i EAT YOU")
            expect(response.body[0].text).toBe("What are the chances i EAT YOU")
        })
        it('should get questions with answers', async () =>{
            const response = await request(app)
                .get('/api/questions/with-user-answers')
                .set("x-test-sub", "sub2")
                .query({year: 2010})
                .expect(200);
            expect(response.body[0].probability).toBe(90)
        })
        it('should get questions with all answers', async () =>{
            const response = await request(app)
                .get('/api/questions/with-all-answers')
                .query({year: 2010})
                .expect(200);
            expect(response.body[0].answers.length).toBe(2)
        })
    })
    describe('post, put, delete tests', () => {
        let qids: number[] = [];
        it('should fail to post a new question', async() =>{
            await request(app)
                .post('/api/questions')
                .set("x-test-sub", "not-a-sub")
                .send({text : "A question that won't go up"})
                .expect(404);
            await request(app)
                .post('/api/questions')
                .set("x-test-sub", "sub1")
                .send({text : "A question that won't go up"})
                .expect(403);
            await request(app)
                .post('/api/questions')
                .set("x-test-sub", "sub3")
                .send({})
                .expect(400);
            await request(app)
                .post('/api/questions')
                .set("x-test-sub", "sub3")
                .send({text : 5})
                .expect(400);
            await request(app)
                .post('/api/questions')
                .set("x-test-sub", "sub3")
                .send({text : "         "})
                .expect(400);
        })
        it('should post a new question', async () =>{
            const response = await request(app)
                .post('/api/questions')
                .set("x-test-sub", "sub3")
                .send({text: "Did my question post?"})
                .expect(200)
            expect(response.body.text).toBe("Did my question post?")
            qids.push(response.body.questionid)
            const getIt = await request(app)
                .get('/api/questions')
                .query({questionid: qids[0]})
                .expect(200)
            expect(response.body.text).toBe("Did my question post?")
            expect(response.body.year).toBe(2027)
        })
        const today = new Date()
            let tomorrow = new Date(today); // Create a new instance to avoid modifying 'today'
            tomorrow.setDate(tomorrow.getDate() + 1);
        it('should post a new question with given the game starts today', async () => {
            // game already started
            const response_set = await request(app)
                    .post('/api/settings/dates')
                    .set("x-test-sub", "sub3")
                    .send({questions_open: today, questions_close : tomorrow})
                    .expect(200);
            const check_settings = await request(app)
                .get('/api/settings/dates')
                .expect(200);
            expect(check_settings.body.open).toBe(today.toISOString());
            expect(check_settings.body.close).toBe(tomorrow.toISOString());
            const response = await request(app)
                .post('/api/questions')
                .set("x-test-sub", "sub3")
                .send({text: "Is the date right?"})
                .expect(200)
            expect(response.body.text).toBe("Is the date right?")
            qids.push(response.body.questionid)
            const getIt = await request(app)
                .get('/api/questions')
                .query({questionid: qids[1]})
                .expect(200)
            expect(getIt.body.text).toBe("Is the date right?")
            expect(getIt.body.year).toBe(today.getFullYear())
        })
        it('should post new quation given the game starts next year', async () =>{
            const oneYearFromToday = new Date(today);
            oneYearFromToday.setFullYear(today.getFullYear() + 1);
            const oneYearFromTomorow = new Date(tomorrow);
            oneYearFromTomorow.setFullYear(tomorrow.getFullYear() + 1);
            const response_set = await request(app)
                    .post('/api/settings/dates')
                    .set("x-test-sub", "sub3")
                    .send({questions_open: oneYearFromToday, questions_close : oneYearFromTomorow})
                    .expect(200);
            const check_settings = await request(app)
                .get('/api/settings/dates')
                .expect(200);
            expect(check_settings.body.open).toBe(oneYearFromToday.toISOString());
            expect(check_settings.body.close).toBe(oneYearFromTomorow.toISOString());
            const response = await request(app)
                .post('/api/questions')
                .set("x-test-sub", "sub3")
                .send({text: "Is the date right?"})
                .expect(200)
            expect(response.body.text).toBe("Is the date right?")
            qids.push(response.body.questionid)
            const getIt = await request(app)
                .get('/api/questions')
                .query({questionid: qids[2]})
                .expect(200)
            expect(getIt.body.text).toBe("Is the date right?")
            expect(getIt.body.year).toBe(oneYearFromToday.getFullYear())
        })
        it('should fail to edit a question', async() =>{
            await request(app)
                .put('/api/questions')
                .set("x-test-sub", "not-a-sub")
                .send({questionid: 1})
                .expect(404);
            await request(app)
                .put('/api/questions')
                .set("x-test-sub", "sub1")
                .send({questionid: 1, text : "change won't happen"})
                .expect(403);
            await request(app)
                .put('/api/questions')
                .set("x-test-sub", "sub3")
                .send({})
                .expect(400);
            await request(app)
                .put('/api/questions')
                .set("x-test-sub", "sub3")
                .send({text: "words"})
                .expect(400);
            await request(app)
                .put('/api/questions')
                .set("x-test-sub", "sub3")
                .send({questionid: 1})
                .expect(400);
            await request(app)
                .put('/api/questions')
                .set("x-test-sub", "sub3")
                .send({text : 5, questionid: 1})
                .expect(400);
            await request(app)
                .put('/api/questions')
                .set("x-test-sub", "sub3")
                .send({text : "         ", questionid: 1})
                .expect(400);
            await request(app)
                .put('/api/questions')
                .set("x-test-sub", "sub3")
                .send({text : "A valid question", questionid: 1, result: "nope"})
                .expect(400);
            await request(app)
                .put('/api/questions')
                .set("x-test-sub", "sub3")
                .send({text : "Question that will fail", questionid: 1000})
                .expect(404);
        })
        it('should edit a question', async () => {
            const before_edits = await request(app)
                .get('/api/questions')
                .query({questionid: qids[0]})
                .expect(200);
            await request(app)
                .put('/api/questions')
                .set("x-test-sub", "sub3")
                .send({text : "did it change?", questionid: qids[0], result: true})
                .expect(200);
            const after_edit = await request(app)
                .get('/api/questions')
                .query({questionid: qids[0]})
                .expect(200);
            expect(after_edit.body.text).toBe("did it change?")
            expect(after_edit.body.year).toBe(before_edits.body.year)
            expect(after_edit.body.result).toBe(true)
        })
        it("shouldn't change the result", async () => {
            const before_edits = await request(app)
                .get('/api/questions')
                .query({questionid: qids[0]})
                .expect(200);
            await request(app)
                .put('/api/questions')
                .set("x-test-sub", "sub3")
                .send({text : "not important", questionid: qids[0]})
                .expect(200);
            const after_edit = await request(app)
                .get('/api/questions')
                .query({questionid: qids[0]})
                .expect(200);
            expect(after_edit.body.text).toBe("not important")
            expect(after_edit.body.year).toBe(before_edits.body.year)
            expect(after_edit.body.result).toBe(before_edits.body.result)
        });
        it('fail to deleted quesions',async () =>{
            await request(app)
                .delete('/api/questions')
                .set("x-test-sub", "not-a-sub")
                .send({questionid: 1})
                .expect(404);
            await request(app)
                .delete('/api/questions')
                .set("x-test-sub", "sub1")
                .send({questionid: 1})
                .expect(403);
            await request(app)
                .delete('/api/questions')
                .set("x-test-sub", "sub3")
                .send({})
                .expect(400);
            await request(app)
                .delete('/api/questions')
                .set("x-test-sub", "sub3")
                .send({questionid: 1000})
                .expect(404);
            await request(app)
                .delete('/api/questions')
                .set("x-test-sub", "sub3")
                .send({questionid: -1})
                .expect(400);
            await request(app)
                .delete('/api/questions')
                .set("x-test-sub", "sub3")
                .send({questionid: "hi"})
                .expect(400);
        })
        it('delete added questions', async () =>{
            for (const qid of qids) {
                await request(app)
                    .delete('/api/questions')
                    .set("x-test-sub", "sub3")
                    .send({questionid: qid})
                    .expect(200);
                await request(app)
                    .get('/api/questions')
                    .query({questionid: qid})
                    .expect(404);
            }
        })
    })
    describe('validation change', () => {
        it('fail to invalidate', async () => {
            await request(app)
                .put('/api/questions/isvalid')
                .set("x-test-sub", "not-a-sub")
                .send({questionid: 1})
                .expect(404);
            await request(app)
                .put('/api/questions/isvalid')
                .set("x-test-sub", "sub1")
                .send({questionid: 1})
                .expect(403);
            await request(app)
                .put('/api/questions/isvalid')
                .set("x-test-sub", "sub3")
                .send({ isvalid: true})
                .expect(400);
            await request(app)
                .put('/api/questions/isvalid')
                .set("x-test-sub", "sub3")
                .send({questionid: 1000, isvalid: true})
                .expect(404);
            await request(app)
                .put('/api/questions/isvalid')
                .set("x-test-sub", "sub3")
                .send({questionid: -1, isvalid: true})
                .expect(400);
            await request(app)
                .put('/api/questions/isvalid')
                .set("x-test-sub", "sub3")
                .send({questionid: "hi", isvalid: true})
                .expect(400);

            await request(app)
                .put('/api/questions/isvalid')
                .set("x-test-sub", "sub3")
                .send({questionid: 1, isvalid: "hi"})
                .expect(400);
            await request(app)
                .put('/api/questions/isvalid')
                .set("x-test-sub", "sub3")
                .send({questionid: 1})
                .expect(400);
        });
        it('invalidate and revalidate', async ()=>{
            await request(app)
                .put('/api/questions/isvalid')
                .set("x-test-sub", "sub3")
                .send({questionid: 1, isvalid : false})
                .expect(200);
            const response1 = await request(app)
                .get('/api/questions')
                .query({questionid: 1})
                .expect(200);
            expect(response1.body.isvalid).toBe(false)

            await request(app)
                .put('/api/questions/isvalid')
                .set("x-test-sub", "sub3")
                .send({questionid: 1, isvalid : true})
                .expect(200);
            const response2 = await request(app)
                .get('/api/questions')
                .query({questionid: 1})
                .expect(200);
            expect(response2.body.isvalid).toBe(true)
            
        });
    })
});

afterAll(async () => {
    const response_reset = await request(app)
        .post('/api/settings/dates')
        .set("x-test-sub", "sub3")
        .send({questions_open: "2026-01-02T00:00:00.000Z", questions_close : "2026-01-09T00:00:00.000Z"})
        .expect(200);
    expect(response_reset.body.open).toBe("2026-01-02T00:00:00.000Z");
    expect(response_reset.body.close).toBe("2026-01-09T00:00:00.000Z");
  await pool.end();
});
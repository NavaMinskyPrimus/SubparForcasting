import 'dotenv/config';
import request from 'supertest';
import { app } from "../../server";
import { pool } from "../../database/pool";

describe('Answers API Integration Tests', () => {
    let user_result
    describe('GET /api/answers', () => {
        it('should get all answers', async () => {
            const response = await request(app)
                .get('/api/answers')
                .query({userid: 1})
                .expect(200);
            expect(response.body.length).toBe(3);
        });
        it('should fail to post answer', async () => {
            await request(app)
                .post('/api/answers/one')
                .send({questionid: 1})
                .expect(400);
            await request(app)
                .post('/api/answers/one')
                .send({probability: 400, questionid: 1})
                .expect(400);
            await request(app)
                .post('/api/answers/one')
                .send({probability: 10, questionid: 400})
                .expect(404);
            await request(app)
                .post('/api/answers/one')
                .set("x-test-sub", "sub4")
                .send({probability: 10, questionid: 1})
                .expect(404);
        });
        let posted_answers : {questionid:number, userid: number, probability: number}[] = []
        let testsubId: number;
        it('should post an answer', async () => {
            await request(app)
                .post('/api/answers/one')
                .set("x-test-sub", "sub2")
                .send({probability: 40, questionid: 2})
                .expect(200);
            const response1 = await request(app)
                .get('/api/answers')
                .query({userid: 2})
                .expect(200);
            expect(Array.isArray(response1.body)).toBe(true);
            expect(response1.body).toContainEqual({ probability: 40, questionid: 2,userid: 2 })
            await request(app)
                .post('/api/answers/one')
                .set("x-test-sub", "sub2")
                .send({probability: 5, questionid: 2})
                .expect(200);
            const response2 = await request(app)
                .get('/api/answers')
                .query({userid: 2})
                .expect(200);
            expect(response2.body).toContainEqual({ probability: 5, questionid: 2,userid: 2 })
            posted_answers.push({questionid: 2, userid: 2, probability: 5})
        });
        it('should fail to post answers', async () => {
            await request(app)
                .post('/api/answers/many')
                .send({answers: [{questionid: 1}]})
                .expect(400);
            await request(app)
                .post('/api/answers/many')
                .send({answers: [{probability: 400, questionid: 1}]})
                .expect(400);
            await request(app)
                .post('/api/answers/many')
                .send({answers:[{probability: 10, questionid: 400}]})
                .expect(404);
            await request(app)
                .post('/api/answers/many')
                .set("x-test-sub", "sub4")
                .send({answers:[{probability: 10, questionid: 1}]})
                .expect(404);
        });
        it('should post two answers', async () =>{
            user_result = await request(app)
                .post('/api/users')
                .set("x-test-sub", "sub3")
                .send({name: "Test User", email: "test@user.org", permission: "user", sub: "testsub"})
                .expect(200);
            expect(user_result.body.email).toBe("test@user.org");
            const id = user_result.body.userid
            const checkuser = await request(app)
                .get(`/api/users/${id}`)
                .expect(200);
            expect(checkuser.body.email).toBe("test@user.org")
            await request(app)
                .post('/api/answers/many')
                .set("x-test-sub", "testsub")
                .send({answers: [{probability: 1, questionid: 1},{probability: 2, questionid: 2}]})
                .expect(200);
            const answers_res = await request(app)
                .get('/api/answers/')
                .query({userid: 101})
                .expect(200);
            expect(Array.isArray(answers_res.body))
            expect(answers_res.body).toContainEqual({ probability: 1, questionid: 1,userid: 101 })
            expect(answers_res.body).toContainEqual({ probability: 2, questionid: 2,userid: 101 })
            posted_answers.push({questionid: 2, userid: 101, probability: 1})
            posted_answers.push({questionid: 1, userid: 101, probability: 2})
        })
        it('should fail to delete things', async () =>{
            await request(app)
                .delete('/api/answers')
                .set("x-test-sub", "testsub")
                .send({})
                .expect(400);
            await request(app)
                .delete('/api/answers')
                .set("x-test-sub", "testsub")
                .send({questionid: 2})
                .expect(400);
            await request(app)
                .delete('/api/answers')
                .set("x-test-sub", "testsub")
                .send({userid: 101})
                .expect(400);
            await request(app)
                .delete('/api/answers')
                .set("x-test-sub", "notasub")
                .send({userid: 101, questionid: 1})
                .expect(404);
            await request(app)
                .delete('/api/answers')
                .set("x-test-sub", "sub1")
                .send({userid: 101, questionid: 1})
                .expect(403);
            await request(app)
                .delete('/api/answers')
                .set("x-test-sub", "testsub")
                .send({userid: 101, questionid: 100})
                .expect(404);
        })
        it('should delete added things', async () =>{
            for(const ans of posted_answers){
                await request(app)
                    .delete('/api/answers/')
                    .set("x-test-sub", "sub3")
                    .send({userid: ans.userid, questionid: ans.questionid})
                    .expect(200)
                const answers_left = await request(app)
                    .get('/api/answers')
                    .query({userid: 101})
                    .expect(200);
                expect(answers_left.body).not.toContainEqual(ans)
            }
            await request(app)
                .delete('/api/users')
                .set("x-test-sub", "sub3")
                .send({userid: 101})
                .expect(200);
             const req = await request(app)
                .get('/api/users/101')
                .expect(404);
        })
    });
});

afterAll(async () => {
  await pool.end();
});
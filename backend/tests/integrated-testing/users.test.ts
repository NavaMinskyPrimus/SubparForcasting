import 'dotenv/config';
import request from 'supertest';
import { app } from "../../server";
import { pool } from "../../database/pool";

describe('Users API Integration Tests', () => {
    let id : number; 
    describe('GET /api/users', () => {
        it('should get all users', async () => {
            const response = await request(app)
                .get('/api/users')
                .send({})
                .expect(200);
            expect(response.body.length).toBe(3);
        });
        it('should add a user', async () => {
            const response = await request(app)
                .post('/api/users')
                .set("x-test-sub", "sub3")
                .send({name: "Test User", email: "test@user.org", permission: "user", sub: "testsub"})
                .expect(200);
            expect(response.body.name).toBe("Test User");
            id = response.body.userid
        });
        it('should fail to remove a user', async () => {
            const response = await request(app)
                .delete('/api/users')
                .send({userid: id})
                .expect(403);
        });
        it('should actually remove a user', async () => {
            const response = await request(app)
                .delete('/api/users')
                .set("x-test-sub", "sub3")
                .send({ userid: id })
                .expect(200);
            });
        });
        it('should add a user', async () => {
            const response = await request(app)
                .post('/api/users')
                .set("x-test-sub", "sub3")
                .send({name: "Test User", email: "test@user.org", permission: "user", sub: "testsub"})
                .expect(200);
            expect(response.body.name).toBe("Test User");
            id = response.body.userid
            const userresponse = await request(app)
                .get(`/api/users/${id}`)
                .expect(200);
            expect(userresponse.body.email).toBe("test@user.org")
            expect(userresponse.body.sub).toBe("testsub")
        });
        it('should change that user and get that user', async () => {
            const response = await request(app)
                .post('/api/users')
                .set("x-test-sub", "sub3")
                .send({name: "Test User", email: "other-email@user.org", permission: "user", sub: "testsub"})
                .expect(200);
            expect(response.body.email).toBe("other-email@user.org");
            const userresponse = await request(app)
                .get(`/api/users/${id}`)
                .expect(200);
            expect(userresponse.body.email).toBe("other-email@user.org")
        });
        it('should actually remove a user', async () => {
            const response = await request(app)
                .delete('/api/users')
                .set("x-test-sub", "sub3")
                .send({ userid: id })
                .expect(200);
        });
        it("should get 'me'", async () => {
            const response = await request(app)
                .get('/api/users/me')
                .set("x-test-sub", "sub3")
                .expect(200);
            expect(response.body.name).toBe("Aba");
        });
});

afterAll(async () => {
  await pool.end();
});
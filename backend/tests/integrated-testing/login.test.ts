import 'dotenv/config';
import request from 'supertest';
import { app } from "../../server";
import { pool } from "../../database/pool";

describe('Answers API Integration Tests', () => {
    describe('GET /api/login', () => {
        it('should log in existing user', async () => {
            const response = await request(app)
                .put('/api/login')
                .send({sub: "sub4"})
                .expect(200);
            expect(response.body.name).toBe("Celine");
        });
        it('should fail in a few ways', async () => {
            await request(app)
                .put('/api/login')
                .send({name: "login-integrated Test User 2"})
                .expect(400);
            await request(app)
                .put('/api/login')
                .send({name: "login-integrated Test User 2", email: null, sub: "sub"})
                .expect(400);
        });
        it('should add sub to existing sub-less user on login', async () => {
            // Create a user with no sub via admin API
            const createResponse = await request(app)
                .post('/api/users')
                .set("x-test-sub", "sub3")
                .send({ name: "Legacy User", email: "legacy@test.org", permission: "user", sub: null })
                .expect(200);
            const id = createResponse.body.userid;
            expect(createResponse.body.sub).toBeNull();

            // Log in as that user — should trigger addSubToUser path
            const loginResponse = await request(app)
                .put('/api/login')
                .send({ name: "Legacy User", email: "legacy@test.org", sub: "legacysub99" })
                .expect(200);
            expect(loginResponse.body.email).toBe("legacy@test.org");
            expect(loginResponse.body.sub).toBe("legacysub99");
            expect(loginResponse.body.userid).toBe(id);

            // Clean up
            const deletedResponse = await request(app)
                .delete('/api/users')
                .set("x-test-sub", "sub3")
                .send({ userid: id })
                .expect(200);
            expect(deletedResponse.body.userid).toBe(id);
        });
        it('should log in new user', async () => {
            const response = await request(app)
                .put('/api/login')
                .send({name: "login-integrated Test User 1", email: "test@user.org", sub: "newsub"})
                .expect(200);
            console.log(response.body)
            expect(response.body.name).toBe("login-integrated Test User 1");
            const id = response.body.userid
            const userresponse = await request(app)
                .get(`/api/users/${id}`)
                .expect(200);
            expect(userresponse.body.email).toBe("test@user.org")
            expect(userresponse.body.sub).toBe("newsub")
            const deletedresponse = await request(app)
                .delete('/api/users')
                .set("x-test-sub", "sub3")
                .send({ userid: id })
                .expect(200);
            expect(deletedresponse.body.email).toBe("test@user.org")
            expect(deletedresponse.body.sub).toBe("newsub")
        });
    });
});

afterAll(async () => {
  await pool.end();
});
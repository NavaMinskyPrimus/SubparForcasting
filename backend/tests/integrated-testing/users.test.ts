import 'dotenv/config';
import request from 'supertest';
import { app } from "../../server";
import { pool } from "../../database/pool";
import { describe } from 'node:test';

describe('Users API Integration Tests', () => {
    let id : number; 
    describe('GET /api/users', () => {
        it('should get all users', async () => {
            const response = await request(app)
                .get('/api/users')
                .expect(200);
            expect(response.body.length).toBe(4);
        });
        it('should add a user', async () => {
            const response = await request(app)
                .post('/api/users')
                .set("x-test-sub", "sub3")
                .send({name: "user-integrated Test User 1", email: "test@user.org", permission: "user", sub: "testsub"})
                .expect(200);
            expect(response.body.name).toBe("user-integrated Test User 1");
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
                .send({name: "user-integrated Test User 2", email: "test@user.org", permission: "user", sub: "testsub"})
                .expect(200);
            expect(response.body.name).toBe("user-integrated Test User 2");
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
                .send({name: "user-integrated Test User 3", email: "other-email@user.org", permission: "user", sub: "testsub"})
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

    describe('PUT /api/users/makeadmin', () => {
        it('should fail for non-admin', async () => {
            await request(app)
                .put('/api/users/makeadmin')
                .set('x-test-sub', 'sub1')
                .send({ email: 'ima@gmail.com' })
                .expect(403);
        });
        it('should fail for unknown email', async () => {
            await request(app)
                .put('/api/users/makeadmin')
                .set('x-test-sub', 'sub3')
                .send({ email: 'nobody@nowhere.com' })
                .expect(404);
        });
        it('should fail for non-string email', async () => {
            await request(app)
                .put('/api/users/makeadmin')
                .set('x-test-sub', 'sub3')
                .send({ email: 123 })
                .expect(403);
        });
        it('should promote Celine to admin', async () => {
            const response = await request(app)
                .put('/api/users/makeadmin')
                .set('x-test-sub', 'sub3')
                .send({ email: 'celine@place.org' })
                .expect(200);
            expect(response.body.permission).toBe('admin');
            expect(response.body.name).toBe('Celine');
        });
        it('should restore Celine to user', async () => {
            const response = await request(app)
                .put('/api/users/makeuser')
                .set('x-test-sub', 'sub3')
                .send({ email: 'celine@place.org' })
                .expect(200);
            expect(response.body.permission).toBe('user');
        });
    });

    describe('PUT /api/users/makeuser', () => {
        it('should fail for non-admin', async () => {
            await request(app)
                .put('/api/users/makeuser')
                .set('x-test-sub', 'sub1')
                .send({ email: 'ima@gmail.com' })
                .expect(403);
        });
        it('should fail for unknown email', async () => {
            await request(app)
                .put('/api/users/makeuser')
                .set('x-test-sub', 'sub3')
                .send({ email: 'nobody@nowhere.com' })
                .expect(404);
        });
        it('should fail for non-string email', async () => {
            await request(app)
                .put('/api/users/makeuser')
                .set('x-test-sub', 'sub3')
                .send({ email: 123 })
                .expect(403);
        });
        it('should promote Ima to admin then demote back to user', async () => {
            await request(app)
                .put('/api/users/makeadmin')
                .set('x-test-sub', 'sub3')
                .send({ email: 'ima@gmail.com' })
                .expect(200);
            const response = await request(app)
                .put('/api/users/makeuser')
                .set('x-test-sub', 'sub3')
                .send({ email: 'ima@gmail.com' })
                .expect(200);
            expect(response.body.permission).toBe('user');
            expect(response.body.name).toBe('Ima');
        });
    });
});

afterAll(async () => {
  await pool.end();
});
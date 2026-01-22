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
                .send({name: "Test User", email: "test@user.org", permission: "user", sub: "testsub"})
                .expect(201);
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
                .set("x-test-email", "test@user.org")
                .set("x-test-sub", "testsub")
                .send({ userid: id })
                .expect(204);
            });
        });
});

afterAll(async () => {
  await pool.end();
});
import 'dotenv/config';
import request from 'supertest';
import { app } from "../../server";
import { pool } from "../../database/pool";

describe('Answers API Integration Tests', () => {
    describe('GET /api/login', () => {
        it('should log in existing user', async () => {
            const response = await request(app)
                .put('/api/login')
                .set("x-test-sub", "sub1")
                .send({})
                .expect(200);
            expect(response.body.name).toBe("Celine");
        });
        it('should fail in a few ways', async () => {
            await request(app)
                .put('/api/login')
                .set("x-test-sub", "sub5")
                .send({name: "Test User"})
                .expect(400);
            await request(app)
                .put('/api/login')
                .set("x-test-sub", "sub5")
                .send({name: "Test User", email: null})
                .expect(400);
        });
        it('should log in new user', async () => {
            const response = await request(app)
                .put('/api/login')
                .set("x-test-sub", "sub4")
                .send({name: "Test User", email: "test@user.org"})
                .send({})
                .expect(200);
            console.log(response.body)
            expect(response.body.name).toBe("Test User");
            const id = response.body.userid
            const userresponse = await request(app)
                .get(`/api/users/${id}`)
                .expect(200);
            expect(userresponse.body.email).toBe("test@user.org")
            expect(userresponse.body.sub).toBe("sub4")
            const deletedresponse = await request(app)
                .delete('/api/users')
                .set("x-test-sub", "sub3")
                .send({ userid: id })
                .expect(200);
            expect(deletedresponse.body.email).toBe("test@user.org")
            expect(deletedresponse.body.sub).toBe("sub4")
        });
    });
});

afterAll(async () => {
  await pool.end();
});
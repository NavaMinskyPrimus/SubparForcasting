require('dotenv').config();
const { permission } = require('process');
const { seedDatabase } = require('./seed-database');

const users = [
    {
        userid: 1,
        name: 'Celine',
        email: "celine@place.org",
        permission: "user",
        sub: "sub1"
    },
    {
        userid: 2,
        name: 'Ima',
        email: 'ima@gmail.com',
        permission: "user",
        sub: "sub2"
    },
    {
        userid: 3,
        name: 'Aba',
        email: 'email@email.com',
        permission: "admin",
        sub: "sub3"
    },
];

const questions = [
    {
        questionid: 1,
        text: 'What are the chances i EAT YOU',
        year: 2010,
        result: null,
        isvalid: true
    },
    {
        questionid: 2,
        text: 'Will my dog eat food tomorow',
        year: 2011,
        result: null,
        isvalid: true
    },
];
const settings = ['2026-01-02T00:00:00Z','2026-01-09T00:00:00Z']

const answers = [
    {
        userid: 1,
        questionid: 1,
        probability: 10 
    },
    {
        userid: 1,
        questionid: 2,
        probability: 99 
    },
    {
        userid: 2,
        questionid: 1,
        probability: 5 
    },
];


// Seed the database and update sequences
const { Client } = require('pg');

async function seedAndUpdateSequences() {
    await seedDatabase(users, questions, answers,settings);
    const client = new Client({
        user: process.env.DB_USER || 'localuser',
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_NAME || 'localdb',
        password: process.env.DB_PASSWORD || 'localpass',
        port: process.env.DB_PORT || 5432,
    });

    try {
        await client.connect();
        // Set the sequence to start after our seeded data
        await client.query(`SELECT setval('"Users_UserID_seq"', 100, true);`);
        console.log('Updated Users sequence to start at 101');
        await client.query(`SELECT setval('"Question_Id_seq"', 100, true);`);
        console.log('Updated question sequence to start at 101');
        await client.end();
    } catch (err) {
        console.error('Error updating sequence:', err);
        throw err;
    }
}

seedAndUpdateSequences()
    .then(() => {
        console.log('Local data seeded successfully (users, questions, answers)');
        process.exit(0);
    })
    .catch((err) => {
        console.error('Failed to seed test data:', err);
        process.exit(1);
    });

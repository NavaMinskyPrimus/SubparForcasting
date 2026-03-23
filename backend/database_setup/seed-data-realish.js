require('dotenv').config();
const { permission } = require('process');
const { seedDatabase } = require('./seed-database');

const users = [
    {
        userid: 1,
        name: 'Nava Minsky-Primus',
        email: "nava.minsky-primus@yale.edu",
        permission: "admin",
        sub: "102234124442432259043"
    },
    {
        userid: 2,
        name: 'Nava Minsky-Primus',
        email: 'navaminskyprimus@gmail.com',
        permission: "user",
        sub: null
    },
];

const settings = ['2026-01-02T00:00:00Z','2026-02-09T00:00:00Z', 2026]

const questions = [
    {
        questionid: 1,
        text: 'What are the chances i EAT YOU',
        year: 2026,
        result: true,
        isvalid: true
    },
    {
        questionid: 2,
        text: 'Will it rain in New Haven on New Years Day',
        year: 2026,
        result: false,
        isvalid: true
    },
    {
        questionid: 3,
        text: 'Will the Orioles make the playoffs',
        year: 2026,
        result: false,
        isvalid: true
    },
    {
        questionid: 4,
        text: 'Will my dog eat food tomorow',
        year: 2027,
        result: null,
        isvalid: true
    },
];

const results = [
    {
        userid: 1,
        userName: 'Nava Minsky-Primus',
        year: 2026,
        confidence: null,
        score: null
    },
    {
        userid: 2,
        userName: 'Nava Minsky-Primus',
        year: 2026,
        confidence: null,
        score: null
    },
]
const answers = [
    {
        userid: 1,
        questionid: 1,
        probability: 10
    },
    {
        userid: 1,
        questionid: 2,
        probability: 70
    },
    {
        userid: 1,
        questionid: 3,
        probability: 40
    },
    {
        userid: 2,
        questionid: 1,
        probability: 69
    },
    {
        userid: 2,
        questionid: 2,
        probability: 55
    },
    {
        userid: 2,
        questionid: 3,
        probability: 40
    },
    {
        userid: 1,
        questionid: 4,
        probability: 60
    },
];


// Seed the database and update sequences
const { Client } = require('pg');

async function seedAndUpdateSequences() {
    await seedDatabase(users, questions, answers, settings, results);
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

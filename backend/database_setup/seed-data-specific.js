require('dotenv').config();
const { seedDatabase } = require('./seed-database');

const users = [
    {
        user_id: 1,
        name: 'Celine',
    },
    {
        user_id: 2,
        name: 'Nava'
    },
    {
        user_id: 3,
        name: 'Aba'
    },
];

const questions = [
    {
        question_id: 1,
        question: 'What are the chances i EAT YOU',
    },
    {
        question_id: 2,
        question: 'Will my dog eat food tomorow',
    },
];

const answers = [
    {
        user_id: 1,
        question_id: 1,
        probability: 10 
    },
    {
        user_id: 1,
        question_id: 2,
        probability: 99 
    },
    {
        user_id: 2,
        question_id: 1,
        probability: 5 
    },
];


// Seed the database and update sequences
const { Client } = require('pg');

async function seedAndUpdateSequences() {
    await seedDatabase(users, questions, answers);
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

const { Client } = require("pg");
// seed mock database with mock users, listings, photos, etc
async function seedDatabase(users = [], questions = [], answers = []) {
    const client = new Client({
        user: process.env.DB_USER || 'localuser', // default is the test database
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_NAME || 'localdb',
        password: process.env.DB_PASSWORD || 'localpass',
        port: process.env.DB_PORT || 5432,
    });

    try {
        await client.connect();
        console.log("Connected to local database");

        // Insert Users
        if (users.length > 0) {
            console.log(`Inserting ${users.length} user(s)...`);
            for (const user of users) {
                await client.query(
                    `INSERT INTO users (user_id, "name")
                     VALUES ($1, $2)
                     ON CONFLICT ("user_id") DO NOTHING`,
                    [user.user_id, user.name]
                );
            }
            console.log(`Inserted ${users.length} users`);
        }

        // Insert questions
        if (questions.length > 0) {
            console.log(`Inserting ${questions.length} question(s)...`);
            for (const question of questions) {
                await client.query(
                    `INSERT INTO questions
                     ("question_id", "question")
                     VALUES ($1, $2)
                     ON CONFLICT ("question_id") DO NOTHING`,
                    [question.question_id, question.question]
                );
            }
            console.log(`Inserted ${questions.length} questions`);
        }
        // Insert answers
        if (answers.length > 0) {
            console.log(`Inserting ${answers.length} answer(s)...`);
            for (const answer of answers) {
                await client.query(
                    `INSERT INTO "answers" ("user_id", "question_id","probability")
                     VALUES ($1, $2, $3)
                     ON CONFLICT ("user_id", "question_id") DO NOTHING`,
                    [answer.user_id, answer.question_id, answer.probability]
                );
            }
            console.log(`Inserted ${answers.length} answers`);
        }
    } catch (err) {
        console.error("Error seeding database:", err.message);
        throw err;
    } finally {
        await client.end();
    }
}

module.exports = { seedDatabase };

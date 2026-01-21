CREATE SEQUENCE "Users_UserID_seq";
CREATE SEQUENCE "Question_Id_seq";
CREATE TYPE user_permission AS ENUM ('admin', 'user');

CREATE TABLE users (
  "userid" INTEGER PRIMARY KEY DEFAULT nextval('"Users_UserID_seq"'),
  "name" VARCHAR(200) NOT NULL,
  "email" VARCHAR(200) NOT NULL,
  "permission" user_permission NOT NULL DEFAULT 'user'
);

CREATE TABLE questions (
  "question_id" INTEGER PRIMARY KEY DEFAULT nextval('"Question_Id_seq"'),
  "question" TEXT
);

CREATE TABLE answers (
    "userid" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,
    "probability" INTEGER,
    PRIMARY KEY ("userid", "question_id"),
    FOREIGN KEY ("userid") REFERENCES "users"("userid"),
    FOREIGN KEY ("question_id") REFERENCES "questions"("question_id"),
    CONSTRAINT probability_range CHECK (probability >= 0 AND probability <= 100)
)
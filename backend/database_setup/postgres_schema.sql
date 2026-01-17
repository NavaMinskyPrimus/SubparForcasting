CREATE SEQUENCE "Users_UserID_seq";
CREATE SEQUENCE "Question_Id_seq";

CREATE TABLE users (
  "user_id" INTEGER PRIMARY KEY DEFAULT nextval('"Users_UserID_seq"'),
  "name" VARCHAR(200) NOT NULL
);

CREATE TABLE questions (
  "question_id" INTEGER PRIMARY KEY DEFAULT nextval('"Question_Id_seq"'),
  "question" TEXT
);

CREATE TABLE answers (
    "user_id" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,
    "probability" INTEGER,
    PRIMARY KEY ("user_id", "question_id"),
    FOREIGN KEY ("user_id") REFERENCES "users"("user_id"),
    FOREIGN KEY ("question_id") REFERENCES "questions"("question_id"),
    CONSTRAINT probability_range CHECK (probability >= 0 AND probability <= 100)
)
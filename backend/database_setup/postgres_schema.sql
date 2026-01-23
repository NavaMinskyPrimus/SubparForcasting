CREATE SEQUENCE "Users_UserID_seq";
CREATE SEQUENCE "Question_Id_seq";
CREATE TYPE user_permission AS ENUM ('admin', 'user');

CREATE TABLE users (
  "userid" INTEGER PRIMARY KEY DEFAULT nextval('"Users_UserID_seq"'),
  "name" VARCHAR(200) NOT NULL,
  "email" VARCHAR(200) NOT NULL,
  "permission" user_permission NOT NULL DEFAULT 'user',
  "sub" VARCHAR(200) NOT NULL,
  CONSTRAINT users_sub_unique UNIQUE ("sub"),
  CONSTRAINT users_email_unique UNIQUE ("email")
);

CREATE TABLE questions (
  "questionid" INTEGER PRIMARY KEY DEFAULT nextval('"Question_Id_seq"'),
  "question" TEXT,
  "year" SMALLINT NOT NULL
  
);

CREATE TABLE answers (
    "userid" INTEGER NOT NULL,
    "questionid" INTEGER NOT NULL,
    "probability" INTEGER,
    PRIMARY KEY ("userid", "questionid"),
    FOREIGN KEY ("userid") REFERENCES "users"("userid"),
    FOREIGN KEY ("questionid") REFERENCES "questions"("questionid"),
    CONSTRAINT probability_range CHECK (probability >= 0 AND probability <= 100)
)
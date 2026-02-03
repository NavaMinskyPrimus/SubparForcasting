import type { Request, Response } from "express";
import { getQuestion, getQuestionsByYear } from "../../../database/question-queries";

export async function handleGetQuestion(req: Request, res: Response) {
    try {
        if (!req.body ){
            console.log("handleGetQuestion: body is undefined")
            return res.status(400).json({err: "body is undefined"});
        }
        const qid = req.body?.questionid;
        if (qid === undefined) {
            console.log("handleGetQuestion: qid is requiered")
            return res.status(400).json({err: "qid is requiered"});
        }
        if (typeof qid !== "number" || !Number.isInteger(qid) || qid <= 0) {
            console.log("handleGetQuestion: qid must be a positive integer")
            return res.status(400).json({ error: "userid must be a positive integer" });
        }
        const question = await getQuestion(qid);
        if(question == null){
            console.log("handleGetQuestion: qid doesn't correspond to a question")
            return res.status(404).json({ error: "questionid does not correspond to question"});
        }
        res.status(200).json(question);
    } catch (error) {
        console.error("Failed to get question", error);
        res.status(500).json({ error: "Failed to get question" });
    }
}

export async function handleGetQuestionByYear(req:Request, res: Response){
    try {
        if (!req.body ){
            console.log("handleGetQuestionByYear: body is undefined")
            return res.status(400).json({err: "body is undefined"});
        }
        const year = req.body?.year;
        if (year === undefined) {
            console.log("handleGetQuestionByYear: year is requiered")
            return res.status(400).json({err: "year is requiered"});
        }
        if (typeof year !== "number" || !Number.isInteger(year) || year <= 0) {
            console.log("handleGetQuestionByYear: year must be a positive integer")
            return res.status(400).json({ error: "year must be a positive integer" });
        }
        const questions = await getQuestionsByYear(year);
        res.status(200).json(questions);
    } catch (error) {
        console.error("Failed to get questions", error);
        res.status(500).json({ error: "Failed to get questions" });
    }
}

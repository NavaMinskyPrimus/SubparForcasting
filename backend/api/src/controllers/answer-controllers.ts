import {deleteAnswer, putAnswer, postAnswer, getAnswersByUID, checkAnswer} from '../../../database/answer-queries';
import type { Request, Response } from "express";

export async function handleGetAnswersByUID(req: Request, res: Response) {
    try{
        if (!req.body ){
            res.status(400).json({err: "body is undefined"});
            return
        }
        const uid = req.body?.userid;
        const answers = await getAnswersByUID(uid);
        res.status(200).json(answers);
    }catch(err){
         console.error("Failed to get answers", err);
        res.status(500).json({ err: "Failed to get answers" });
    }
}
export async function handlePostAnswer(req: Request, res: Response) {
    try{
        if (!req.body ){
            res.status(400).json({err: "body is undefined"});
            return
        }
        const uid = req.body?.userid;
        const qid = req.body?.questionid;
        const prob = req.body?.probability;
        if (uid === undefined || qid === undefined || prob === undefined) {
            return res.status(400).json({
                error: "userid, questionid, and probability are required",
            });
        }
        if (typeof uid !== "number" || typeof qid !== "number" || typeof prob !== "number"){
            return res.status(400).json({
                error: "userid, questionid, and probability must be numbers",
            });
        }
        const answers = await postAnswer(uid, qid, prob);
        res.status(201).json(answers);
    }catch(err){
        console.error("Failed to get answers", err);
        res.status(500).json({ err: "Failed to get answers" });
    }
}

export async function handleDeleteAnswer(req: Request, res: Response){
    try{
        if (!req.body ){
            res.status(400).json({err: "body is undefined"});
            return
        }
        const uid = req.body?.userid;
        const qid = req.body?.questionid;
        if (uid === undefined || qid === undefined) {
            return res.status(400).json({
                error: "userid and questionid are required",
            });
        }
        if (typeof uid !== "number" || typeof qid !== "number"){
            return res.status(400).json({
                error: "userid and questionid must be numbers",
            });
        }
        const answers = await deleteAnswer(uid, qid);
        if(answers == null){
            return res.status(404).json({ error: "answer not found"})
        }
        res.status(204).json(answers);
    }catch(err){
        console.error("Failed to delete answer", err);
        res.status(500).json({ err: "Failed to get answers" });
    }

}


import {deleteAnswer, postAnswer, getAnswersByUID, checkAnswer} from '../../../database/answer-queries';
import {getQuestion} from '../../../database/question-queries';
import type { Request, Response } from "express";
import { getUserByID, getUserBySub } from '../../../database/user-queries';

export async function handleGetAnswersByUID(req: Request, res: Response) {
    try{
        if (!req.body ){
            res.status(400).json({err: "body is undefined"});
            return
        }
        const uid = req.body?.userid;
        if (uid === undefined) {
            return res.status(400).json({err: "uid is requiered"});
        }
        if (typeof uid !== "number" || !Number.isInteger(uid) || uid <= 0) {
            return res.status(400).json({ error: "userid must be a positive integer" });
        }
        const user = await getUserByID(uid);
        if(user == null){
            return res.status(404).json({ error: "userid does not correspond to user"});
        }
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
        if (!req.auth?.sub) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        const sub = req.auth.sub;
        const currentUser = await getUserBySub(sub);
        if(!currentUser){
            return res.status(404).json({ error: 'current user not found' });
        }
        const uid = currentUser.userid;
        const qid = req.body?.questionid;
        const prob = req.body?.probability;
        if (qid === undefined || prob === undefined) {
            return res.status(400).json({
                error: "questionid and probability are required",
            });
        }
        if (typeof qid !== "number" || typeof prob !== "number"){
            return res.status(400).json({
                error: "questionid and probability must be numbers",
            });
        }
        if(prob < 0 || prob > 100){
            return res.status(400).json({
                error: "probability must be between 0 and 100",
            });
        }
        const question = await getQuestion(qid);
        if(question == null){
            return res.status(404).json({
                error: "No question associated with given question",
            });
        }
        const answers = await postAnswer(uid, qid, prob);
        res.status(200).json(answers);
    }catch(err){
        console.error("Failed to post answers", err);
        res.status(500).json({ err: "Failed to post answers" });
    }
}

export async function handleDeleteAnswer(req: Request, res: Response){
    try{
        if (!req.body ){
            res.status(400).json({err: "body is undefined"});
            return
        }

        if (!req.auth?.sub) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        const sub = req.auth.sub;
        const currentUser = await getUserBySub(sub);
        if(!currentUser){
            return res.status(404).json({ error: 'current user not found' });
        }
        const uid = req.body?.userid;
        const qid = req.body?.questionid;
        if (uid === undefined || qid === undefined) {
            return res.status(400).json({
                error: "userid and questionid are required",
            });
        }
        if (typeof uid !== "number" || typeof qid !== "number" || uid < 0 || qid < 0){
            return res.status(400).json({
                error: "userid and questionid must be positive numbers",
            });
        }
        if(currentUser.permission != "admin" && uid != currentUser.uid){
            return res.status(403).json({ error: "Only admins can delete other poeple's answers"});
        }
        const answers = await deleteAnswer(uid, qid);
        if(answers == null){
            return res.status(404).json({ error: "answer not found"})
        }
        res.status(200).json(answers);
    }catch(err){
        console.error("Failed to delete answer", err);
        res.status(500).json({ err: "Failed to get answers" });
    }

}


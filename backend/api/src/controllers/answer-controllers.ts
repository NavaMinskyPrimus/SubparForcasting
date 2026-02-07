import {deleteAnswer, postAnswer, getAnswersByUID, checkAnswer} from '../../../database/answer-queries';
import {getQuestion} from '../../../database/question-queries';
import type { Request, Response } from "express";
import { getUserByID, getUserBySub } from '../../../database/user-queries';

export async function handleGetAnswersByUID(req: Request, res: Response) {
    try{
        const rawUid = req.query.userid;
        if (rawUid === undefined) {
            return res.status(400).json({err: "uid is requiered"});
        }
        const uid = Number(rawUid);
        if (!Number.isInteger(uid) || uid <= 0) {
            return res.status(400).json({ err: "userid must be a positive integer" });
        }
        const user = await getUserByID(uid);
        if(user == null){
            return res.status(404).json({ err: "userid does not correspond to user"});
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
            console.error("handlePostAnswer: Body is undefined")
            res.status(400).json({err: "body is undefined"});
            return
        }
        if (!req.auth?.sub) {
            console.error("handlePostAnswer: Authentication required")
            return res.status(401).json({ err: 'Authentication required' });
        }
        const sub = req.auth.sub;
        const currentUser = await getUserBySub(sub);
        if(!currentUser){
            console.error("handlePostAnswer: Current user not found")
            return res.status(404).json({ err: 'current user not found' });
        }
        const uid = currentUser.userid;
        const qid = req.body?.questionid;
        const prob = req.body?.probability;
        if (qid === undefined || prob === undefined) {
            console.error("handlePostAnswer: questionid and probability are require")
            return res.status(400).json({
                err: "questionid and probability are required",
            });
        }
        if (typeof qid !== "number" || typeof prob !== "number"){
            console.error("handlePostAnswer: questionid and probability must be numbers")
            return res.status(400).json({
                err: "questionid and probability must be numbers",
            });
        }
        if(prob < 0 || prob > 100){
            console.error("handlePostAnswer: probability must be between 0 and 100")
            return res.status(400).json({
                err: "probability must be between 0 and 100",
            });
        }
        const question = await getQuestion(qid);
        if(question == null){
            return res.status(404).json({
                err: "No question associated with given question",
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
            return res.status(401).json({ err: 'Authentication required' });
        }
        const sub = req.auth.sub;
        const currentUser = await getUserBySub(sub);
        if(!currentUser){
            return res.status(404).json({ err: 'current user not found' });
        }
        const uid = req.body?.userid;
        const qid = req.body?.questionid;
        if (uid === undefined || qid === undefined) {
            return res.status(400).json({
                err: "userid and questionid are required",
            });
        }
        if (typeof uid !== "number" || typeof qid !== "number" || uid < 0 || qid < 0){
            return res.status(400).json({
                err: "userid and questionid must be positive numbers",
            });
        }
        if(currentUser.permission != "admin" && uid != currentUser.uid){
            return res.status(403).json({ err: "Only admins can delete other poeple's answers"});
        }
        const answers = await deleteAnswer(uid, qid);
        if(answers == null){
            return res.status(404).json({ err: "answer not found"})
        }
        res.status(200).json(answers);
    }catch(err){
        console.error("Failed to delete answer", err);
        res.status(500).json({ err: "Failed to get answers" });
    }

}


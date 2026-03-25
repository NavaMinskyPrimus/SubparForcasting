import {deleteAnswer, postAnswer, getAnswersByUID, checkAnswer, postAnswers} from '../../../database/answer-queries';
import {getQuestion} from '../../../database/question-queries';
import type { Request, Response } from "express";
import { getUserByID, getUserBySub } from '../../../database/user-queries';

export async function handleGetAnswersByUID(req: Request, res: Response) {
    try{
        const rawUid = req.query.userid;
        if (rawUid === undefined || rawUid == null) {
            console.error("handleDeleteAnswer: uid is requiered")
            return res.status(400).json({err: "uid is requiered"});
        }
        const uid = Number(rawUid);
        if (!Number.isInteger(uid) || uid <= 0) {
            console.error("handleDeleteAnswer: userid must be a positive integer")
            return res.status(400).json({ err: "userid must be a positive integer" });
        }
        const user = await getUserByID(uid);
        if(user == null){
            console.error("handleDeleteAnswer: userid does not correspond to user")
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
        if (qid === undefined || prob === undefined || prob == null || qid == null) {
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
        console.error("Failed to post answer", err);
        res.status(500).json({ err: "Failed to post answer" });
    }
}

export async function handleDeleteAnswer(req: Request, res: Response){
    try{
        if (!req.body ){
            console.error("handleDeleteAnswer: body is undefined")
            res.status(400).json({err: "body is undefined"});
            return
        }
        if (!req.auth?.sub){
            console.error("handleDeleteAnswer: authentication required")
            return res.status(401).json({ err: 'Authentication required' });
        }
        const sub = req.auth.sub;
        const currentUser = await getUserBySub(sub);
        if(!currentUser){
            console.error("handleDeleteAnswer: current user not found")
            return res.status(404).json({ err: 'current user not found' });
        }
        const uid = req.body?.userid;
        const qid = req.body?.questionid;
        if (uid === undefined || qid === undefined) {
            console.error("handleDeleteAnswer: userid and questionid are required")
            return res.status(400).json({
                err: "userid and questionid are required",
            });
        }
        if (typeof uid !== "number" || typeof qid !== "number" || uid < 0 || qid < 0){
            console.error("handleDeleteAnswer: userid and questionid must be positive numbers")
            return res.status(400).json({
                err: "userid and questionid must be positive numbers",
            });
        }
        if((currentUser.permission != "admin") && (uid != currentUser.userid)){
            console.error("handleDeleteAnswer: only admins can delete other people's answers")
            return res.status(403).json({ err: "Only admins can delete other poeple's answers"});
        }
        const answers = await deleteAnswer(uid, qid);
        if(answers == null){
            console.error("handleDeleteAnswer: answer not found")
            return res.status(404).json({ err: "answer not found"})
        }
        res.status(200).json(answers);
    }catch(err){
        console.error("Failed to delete answer", err);
        res.status(500).json({ err: "Failed to get answers" });
    }
}

export async function handlePostAnswers(req: Request, res: Response){
    try{
        if (!req.body ){
            console.error("handlePostAnswers: body is undefined")
            return res.status(400).json({err: "body is undefined"});   
        }
        if (!req.auth?.sub) {
            console.error("handlePostAnswers: Authentication required")
            return res.status(401).json({ err: 'Authentication required' });
        }
        const sub = req.auth.sub;
        const currentUser = await getUserBySub(sub);
        if(!currentUser){
            console.error("handlePostAnswers: current user not found")
            return res.status(404).json({ err: 'current user not found' });
        }
        const uid = currentUser.userid
        const answers = req.body.answers
        if(answers == null || answers == undefined){
            console.error("handlePostAnswers: answers is requiered")
            return res.status(400).json({err: 'answers is requiered'})
        }
        if(!Array.isArray(answers)){
            console.error("handlePostAnswers: answers must be an array")
            return res.status(400).json({err: 'answers must be an array'})
        }
        if(answers.length == 0){
            return res.status(200).json([]);
        }
        let ans_list = []
        console.log(answers)
        for (const ans of answers) {
            console.log(ans)
            const qid = ans.questionid
            if(qid == null || qid == undefined){
                console.error("handlePostAnswers: all answers must have qid")
                return res.status(400).json({err: 'all answers must have qid'})
            }
            if(typeof(qid) != "number"){
                console.error("handlePostAnswers: qids must all be numbers")
                return res.status(400).json({err: 'qids must all be numbers'})
            }
            const question = await getQuestion(qid);
            if(question == null){
                console.error("handlePostAnswers: No question associated with one of the given qids")
                return res.status(404).json({
                    err: "No question associated with one of the given qids",
                });
            }
            const prob = ans.probability
            if(prob == null || qid == undefined){
                console.error("handlePostAnswers: all answers must have a probability")
                return res.status(400).json({err: 'all answers must have a probability'})
            }
            if(typeof(prob) != "number"){
                console.error("handlePostAnswers: probabilities must be numbers")
                return res.status(400).json({err: 'probabilities must be numbers'})
            }
            if(prob < 0 || prob > 100){
                console.error("handlePostAnswers: probability must be between 0 and 100")
                return res.status(400).json({err: 'probability must be between 0 and 100'})
            }
            ans_list.push({ userid: uid, questionid: qid, probability: prob })
        }
        const posted = await postAnswers(ans_list)
        res.status(200).json(posted);
        if(posted == null){
            console.error("handlePostAnswers: probability must be between 0 and 100")
            return res.status(400).json({err: 'probability must be between 0 and 100'})
        }
    }catch(err){
        console.error("handlePostAnswers: Failed to post answers", err);
        res.status(500).json({ err: "Failed to post answers" });
    }
}


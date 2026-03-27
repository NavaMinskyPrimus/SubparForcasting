import type { Request, Response } from "express";
import { changeValidation, deleteQuestionWithAssociatedAnswers, getQuestion, getQuestionsByYear, postQuestion, putQuestion } from "../../../database/question-queries";
import { getSettings } from "../../../database/settings-queries"
import { getUserByID, getUserBySub } from "../../../database/user-queries";
import { checkAnswer, getAnswersByQID } from "../../../database/answer-queries";
export async function handleGetQuestion(req: Request, res: Response) {
    try {
        const rawQid = req.query.questionid;
        if (rawQid === undefined) {
            console.error("handleGetQuestion: qid is requiered")
            return res.status(400).json({err: "qid is requiered"});
        }
        const qid = Number(rawQid);
        if (!Number.isInteger(qid) || qid <= 0) {
            console.error("handleGetQuestion: qid must be a positive integer")
            return res.status(400).json({ err: "userid must be a positive integer" });
        }
        const question = await getQuestion(qid);
        if(question == null){
            console.error("handleGetQuestion: qid doesn't correspond to a question")
            return res.status(404).json({ err: "questionid does not correspond to question"});
        }
        res.status(200).json(question);
    } catch (err) {
        console.error("Failed to get question", err);
        res.status(500).json({ ererrror: "Failed to get question" });
    }
}

export async function handleGetQuestionByYear(req:Request, res: Response){
    try {
        const rawYear = req.query.year;
        if (rawYear === undefined) {
            console.error("handleGetQuestionByYear: year is requiered")
            return res.status(400).json({err: "year is requiered"});
        }
        const year = Number(rawYear);
        if (!Number.isInteger(year) || year <= 0) {
            console.error("handleGetQuestionByYear: year must be a positive integer")
            return res.status(400).json({ err: "year must be a positive integer" });
        }
        const questions = await getQuestionsByYear(year);
        res.status(200).json(questions);
    } catch (err) {
        console.error("Failed to get questions", err);
        res.status(500).json({ err: "Failed to get questions" });
    }
}

export async function handlePostQuestion(req: Request, res: Response){
    try { // should need admin status
        if (!req.body ){
            console.error("handlePostQuestion: body is undefined")
            return res.status(400).json({err: "body is undefined"});
        }
        if (!req.auth?.sub) {
            console.error("handlePostQuestion: authentication required")
            return res.status(401).json({ err: 'Authentication required' });
        }
        const sub = req.auth.sub;
        const currentUser = await getUserBySub(sub);
        if(!currentUser){
            console.error("handlePostQuestion: current user not found in database")
            return res.status(404).json({ err: 'current user not found' });
        }
        if(currentUser.permission != "admin"){
            console.error("handlePostQuestion: only admins can post questions");
            return res.status(403).json({err: "only admins can post questions"})
        }
        const text = req.body.text;
        if(text == null || text == undefined){
        console.error("handlePostQuestion: Text is required")
            return res.status(400).json({ err: 'Text is required' });
        }
        if (typeof text !== "string"){
            console.error("handlePostQuestion: Given question text must be a string")
            return res.status(400).json({ err: 'text must be a string' });
        }
        const cleaned = text.trim();
        if (cleaned.length === 0) {
            console.error("handlePostQuestion: text cannot be empty")
            return res.status(400).json({ err: "text cannot be empty" });
        }
        const settings = await getSettings()
        const start = new Date(settings.questions_open)
        const end = new Date(settings.questions_close)
        const currentDate =  new Date();
        let year;
        if(currentDate > end){  // the game has ended, settings aren't updated
            year = start.getFullYear() + 1
        }else{ // the game starts in the future or has started
            year = start.getFullYear()
        }
        if(Number.isNaN(year)){
            console.error("handlePostQuestion: current year is invalid")
            return res.status(500).json({ err: "invalid current year" });
        }
        const q = await postQuestion(cleaned,year)
        res.status(200).json(q);
    } catch (err) {
        console.error("Failed to post questions", err);
        res.status(500).json({ err: "Failed to post questions" });
    }
}

export async function handleDeleteQuestion(req: Request, res: Response){
    try { // should need admin status
        if (!req.body ){
            console.error("handleDeleteQuestion: body is undefined")
            return res.status(400).json({err: "body is undefined"});
        }
        if (!req.auth?.sub) {
            console.error("handleDeleteQuestion: authentication required")
            return res.status(401).json({ err: 'Authentication required' });
        }
        const sub = req.auth.sub;
        const currentUser = await getUserBySub(sub);
        if(!currentUser){
            console.error("handleDeleteQuestion: current user not found in database")
            return res.status(404).json({ err: 'current user not found' });
        }
        if(currentUser.permission != "admin"){
            console.error("handleDeleteQuestion: only admins can delete questions");
            return res.status(403).json({err: "only admins can delete questions"})
        }
        const qid = req.body.questionid;
        if (qid === undefined) {
            console.error("handleDeleteQuestion: qid is requiered")
            return res.status(400).json({err: "qid is requiered"});
        }
        if (typeof qid !== "number" || !Number.isInteger(qid) || qid <= 0) {
            console.error("handleDeleteQuestion: qid must be a positive integer")
            return res.status(400).json({ err: "qid must be a positive integer" });
        }
        const deleted = await deleteQuestionWithAssociatedAnswers(qid);
        if(deleted == null){
            console.error("handleDeleteQuestion: question not found")
            return res.status(404).json({ err: 'question not found' });
        }
        res.status(200).json(deleted);
    } catch (err) {
        console.error("Failed to delete question", err);
        res.status(500).json({ err: "Failed to delete question" });
    }
}

export async function handlePutQuestion(req: Request, res: Response){
    try{
        if (!req.body ){
            console.error("handlePutQuestion: body is undefined")
            return res.status(400).json({err: "body is undefined"});
        }
        if (!req.auth?.sub) {
            console.error("handlePutQuestion: authentication required")
            return res.status(401).json({ err: 'Authentication required' });
        }
        const sub = req.auth.sub;
        const currentUser = await getUserBySub(sub);
        if(!currentUser){
            console.error("handlePutQuestion: current user not found in database")
            return res.status(404).json({ err: 'current user not found' });
        }
        if(currentUser.permission != "admin"){
            console.error("handlePutQuestion: only admins can delete questions");
            return res.status(403).json({err: "only admins can delete questions"})
        }
        const qid = req.body.questionid;
        if (qid === undefined) {
            console.error("handlePutQuestion: qid is requiered")
            return res.status(400).json({err: "qid is requiered"});
        }
        if (typeof qid !== "number" || !Number.isInteger(qid) || qid <= 0) {
            console.error("handlePutQuestion: qid must be a positive integer")
            return res.status(400).json({ err: "qid must be a positive integer" });
        }
        const text = req.body.text;
        if (text == null || text == undefined){
            console.error("handlePutQuestion: text is requiered")
            return res.status(400).json({err: "qtextid is requiered"});
        }
        if (typeof text !== "string"){
            console.error("handlePutQuestion: Given question text must be a string")
            return res.status(400).json({ err: 'text must be a string' });
        }
        const cleaned = text.trim();
        if (cleaned.length === 0) {
            console.error("handlePutQuestion: text cannot be empty")
            return res.status(400).json({ err: "text cannot be empty" });
        }
        let result = req.body.result;
        if(result == undefined){
            result = null
        }
        if(typeof(result) != "boolean" && result != null){
            console.error("handlePutQuestion: result must be a boolean or null");
            return res.status(400).json({ err: "result must be a boolean or null "});
        }
        const updated = await putQuestion(qid, text, result);
        if(updated == null){
            console.error("handlePutQuestion: question not found")
            return res.status(404).json({ err: 'question not found' });
        }
        return res.status(200).json(updated);

    }catch(err){
        console.error("handlePutQuestion: Failed to delete question", err);
        res.status(500).json({ err: "Failed to delete question" });
    }
}

export async function handleGetQuestionsWithUserAnswers(req: Request, res: Response) { // this gets the answers for one user
    try {
        const rawYear = req.query.year;
        if (rawYear === undefined) {
            console.error("handleGetQuestionsWithAnswers: year is requiered")
            return res.status(400).json({err: "year is requiered"});
        }
        const year = Number(rawYear);
        if (!Number.isInteger(year) || year <= 0) {
            console.error("handleGetQuestionsWithAnswers: year must be a positive integer")
            return res.status(400).json({ err: "year must be a positive integer" });
        }
        const questions = await getQuestionsByYear(year);
        if (!req.auth?.sub) {
            console.error("handleGetQuestionsWithAnswers: authentication required")
            return res.status(401).json({ err: 'Authentication required' });
        }
        const sub = req.auth.sub;
        const currentUser = await getUserBySub(sub);
        if(!currentUser){
            console.error("handleGetQuestionsWithAnswers: current user not found in database")
            return res.status(404).json({ err: 'current user not found' });
        }
        const result = []
        for(const q of questions){
            const qid = q.questionid
            const ans = await checkAnswer(currentUser.userid, qid)
            const probability = (ans == null) ? 50 : ans.probability;
            result.push({questionid: qid, text: q.text, probability: probability})
        }
        res.status(200).json(result);
    } catch (err) {
        console.error("handleGetQuestionsWithAnswers: Failed to get questions", err);
        res.status(500).json({ err: "Failed to get questions" });
    }
}

export async function handleValidation(req: Request, res: Response) {
    try{
        if (!req.body ){
            console.error("handleValidation: body is undefined")
            return res.status(400).json({err: "body is undefined"});
        }
        if (!req.auth?.sub) {
            console.error("handleValidation: authentication required")
            return res.status(401).json({ err: 'Authentication required' });
        }
        const sub = req.auth.sub;
        const currentUser = await getUserBySub(sub);
        if(!currentUser){
            console.error("handleValidation: current user not found in database")
            return res.status(404).json({ err: 'current user not found' });
        }
        if(currentUser.permission != "admin"){
            console.error("handleValidation: only admins can change validation");
            return res.status(403).json({err: "only admins can change validation"})
        }
        const qid = req.body.questionid;
        if (qid === undefined) {
            console.error("handleValidation: qid is requiered")
            return res.status(400).json({err: "qid is requiered"});
        }
        if (typeof qid !== "number" || !Number.isInteger(qid) || qid <= 0) {
            console.error("handleValidation: qid must be a positive integer")
            return res.status(400).json({ err: "qid must be a positive integer" });
        }
        const isvalid = req.body.isvalid;
        if(typeof(isvalid) != 'boolean'){
            console.error("handleValidation: isvalid must be a boolean")
            return res.status(400).json({ err: "isvalid must be a boolean" });
        }
        const changed = await changeValidation(qid, isvalid);
        if(changed == null){
            console.error("handleValidation: question not found")
            return res.status(404).json({ err: 'question not found' });
        }
        res.status(200).json(changed);
    }catch(err){
        console.error("handleValidation: Failed to update validation", err);
        res.status(500).json({ err: "Failed to update validation" });
    }
}


export async function handleGetDisplayInformation(req: Request, res: Response) { // this gets the answers for one user
    try {
        const rawYear = req.query.year;
        if (rawYear === undefined) {
            console.error("handleGetDisplayInformation: year is requiered")
            return res.status(400).json({err: "year is requiered"});
        }
        const year = Number(rawYear);
        if (!Number.isInteger(year) || year <= 0) {
            console.error("handleGetDisplayInformation: year must be a positive integer")
            return res.status(400).json({ err: "year must be a positive integer" });
        }
        const questions = await getQuestionsByYear(year);
        if (!req.auth?.sub) {
            console.error("handleGetDisplayInformation: authentication required")
            return res.status(401).json({ err: 'Authentication required' });
        }
        const sub = req.auth.sub;
        const currentUser = await getUserBySub(sub);
        if(!currentUser){
            console.error("handleGetDisplayInformation: current user not found in database")
            return res.status(404).json({ err: 'current user not found' });
        }
        const questions_with_answers = []
        const players: Record<number, string> = {};
        for(const q of questions){
            const qid = q.questionid
            const answers_raw = await getAnswersByQID(qid)
            const answers = []
            for(const ans of answers_raw){
                const answer_user = await getUserByID(ans.userid)
                answers.push({userid: ans.userid, name: answer_user.name, probability: ans.probability})
                players[ans.userid] = answer_user.name;
            }
            questions_with_answers.push({...q,  answers: answers})
        }
        res.status(200).json({me: currentUser, questions_with_answers: questions_with_answers, players: players});
    } catch (err) {
        console.error("handleGetQuestionsWithAllAnswers: Failed to get questions", err);
        res.status(500).json({ err: "Failed to get questions" });
    }
}


import type { Request, Response } from "express";
import { deleteQuestionWithAssociatedAnswers, getQuestion, getQuestionsByYear, postQuestion, putQuestion } from "../../../database/question-queries";
import { getSettings } from "../../../database/settings-queries"
import { getUserBySub } from "../../../database/user-queries";
export async function handleGetQuestion(req: Request, res: Response) {
    try {
        if (!req.body ){
            console.error("handleGetQuestion: body is undefined")
            return res.status(400).json({err: "body is undefined"});
        }
        const qid = req.body?.questionid;
        if (qid === undefined) {
            console.error("handleGetQuestion: qid is requiered")
            return res.status(400).json({err: "qid is requiered"});
        }
        if (typeof qid !== "number" || !Number.isInteger(qid) || qid <= 0) {
            console.error("handleGetQuestion: qid must be a positive integer")
            return res.status(400).json({ error: "userid must be a positive integer" });
        }
        const question = await getQuestion(qid);
        if(question == null){
            console.error("handleGetQuestion: qid doesn't correspond to a question")
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
            console.error("handleGetQuestionByYear: body is undefined")
            return res.status(400).json({err: "body is undefined"});
        }
        const year = req.body?.year;
        if (year === undefined) {
            console.error("handleGetQuestionByYear: year is requiered")
            return res.status(400).json({err: "year is requiered"});
        }
        if (typeof year !== "number" || !Number.isInteger(year) || year <= 0) {
            console.error("handleGetQuestionByYear: year must be a positive integer")
            return res.status(400).json({ error: "year must be a positive integer" });
        }
        const questions = await getQuestionsByYear(year);
        res.status(200).json(questions);
    } catch (error) {
        console.error("Failed to get questions", error);
        res.status(500).json({ error: "Failed to get questions" });
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
            return res.status(401).json({ error: 'Authentication required' });
        }
        const sub = req.auth.sub;
        const currentUser = await getUserBySub(sub);
        if(!currentUser){
            console.error("handlePostQuestion: current user not found in database")
            return res.status(404).json({ error: 'current user not found' });
        }
        if(currentUser.permission != "admin"){
            console.error("handlePostQuestion: only admins can post questions");
            return res.status(403).json({err: "only admins can post questions"})
        }
        const text = req.body.text;
        if(text == null || text == undefined){
        console.error("handlePostQuestion: Text is required")
            return res.status(400).json({ error: 'Text is required' });
        }
        if (typeof text !== "string"){
            console.error("handlePostQuestion: Given question text must be a string")
            return res.status(400).json({ error: 'text must be a string' });
        }
        const cleaned = text.trim();
        if (cleaned.length === 0) {
            console.error("handlePostQuestion: text cannot be empty")
            return res.status(400).json({ error: "text cannot be empty" });
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
            return res.status(500).json({ error: "invalid current year" });
        }
        const q = await postQuestion(cleaned,year)
        res.status(200).json(q);
    } catch (error) {
        console.error("Failed to post questions", error);
        res.status(500).json({ error: "Failed to post questions" });
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
            return res.status(401).json({ error: 'Authentication required' });
        }
        const sub = req.auth.sub;
        const currentUser = await getUserBySub(sub);
        if(!currentUser){
            console.error("handleDeleteQuestion: current user not found in database")
            return res.status(404).json({ error: 'current user not found' });
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
            return res.status(400).json({ error: "qid must be a positive integer" });
        }
        const deleted = await deleteQuestionWithAssociatedAnswers(qid);
        if(deleted == null){
            console.error("handleDeleteQuestion: question not found")
            return res.status(404).json({ error: 'question not found' });
        }
        res.status(200).json(deleted);
    } catch (error) {
        console.error("Failed to delete question", error);
        res.status(500).json({ error: "Failed to delete question" });
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
            return res.status(401).json({ error: 'Authentication required' });
        }
        const sub = req.auth.sub;
        const currentUser = await getUserBySub(sub);
        if(!currentUser){
            console.error("handlePutQuestion: current user not found in database")
            return res.status(404).json({ error: 'current user not found' });
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
            return res.status(400).json({ error: "qid must be a positive integer" });
        }
        const text = req.body.text;
        if (text == null || text == undefined){
            console.error("handlePutQuestion: text is requiered")
            return res.status(400).json({err: "qtextid is requiered"});
        }
        if (typeof text !== "string"){
            console.error("handlePutQuestion: Given question text must be a string")
            return res.status(400).json({ error: 'text must be a string' });
        }
        const cleaned = text.trim();
        if (cleaned.length === 0) {
            console.error("handlePutQuestion: text cannot be empty")
            return res.status(400).json({ error: "text cannot be empty" });
        }
        const updated = await putQuestion(qid, text);
        if(updated == null){
            console.error("handlePutQuestion: question not found")
            return res.status(404).json({ error: 'question not found' });
        }
        return res.status(200).json(updated);

    }catch(err){
        console.error("handlePutQuestion: Failed to delete question", err);
        res.status(500).json({ err: "Failed to delete question" });
    }
}
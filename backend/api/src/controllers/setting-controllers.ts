import type { Request, Response } from "express";
import { getSettings, setCloseDate, setDates, setOpenDate } from "../../../database/settings-queries";
import { getUserBySub } from "../../../database/user-queries";

export async function handleGetDates(req: Request, res: Response) {
    try{
        if (!req.auth?.sub) {
            console.error("handleGetDates: authentication requiered");
            return res.status(401).json({ error: 'Authentication required' });
        }
        const settings = await getSettings();
        if(settings == null){
            console.error("handleGetDates: Settings not found")
            return res.status(404).json({ error: 'Settings not found' });
        }
        if(!settings.questions_open || !settings.questions_close){
            console.error("handleGetDates: questions_open or questions_close not found")
            return res.status(404).json({ error: 'questions_open or questions_close setting not found' });

        }
        const dates = {open: settings.questions_open, close: settings.questions_close};
        res.json(dates);
    }catch(err){
        console.error("Failed to get dates", err);
        res.status(500).json({ err: "Failed to get dates" });
    }
}
function isValidDate(dateString : string) {
  const dateObject = new Date(dateString);
  return isNaN(dateObject.valueOf()); 
}
export async function handleSetDates(req:Request, res: Response){
    try{
        if (!req.auth?.sub) {
            console.error("handleSetDates: authentication requiered");
            return res.status(401).json({ error: 'Authentication required' });
        }
        const sub = req.auth.sub;
        const currentUser = await getUserBySub(sub);
        if(!currentUser){
            console.error("handleSetDates: currnet user not found");
            return res.status(404).json({ error: 'current user not found' });
        }
        if(currentUser.permission != "admin"){
            console.error("handleSetDates: only admins can update settings");
            return res.status(403).json({ error: 'Only admins can update settings' });
        }
        if(!req.body){
            return res.status(400).json({error: "body is required"});
        }
        const questions_open = req.body.questions_open;
        const questions_close = req.body.questions_close;
        const nothing = [null, undefined]
        if(questions_open in nothing || questions_close in nothing ){
            console.error("handleSetDates: questions_open and questions_close are required");
            return res.status(400).json({error: "questions_open and questions_close are required"});
        }
        if(isValidDate(questions_open) || isValidDate(questions_close)){
            console.log(questions_open)
            console.log(questions_close)
            console.error("handleSetDates: questions_open and questions_close must be dates");
            return res.status(400).json({error: "questions_open and questions_close must be dates"});
        }
        const open_date = new Date(questions_open);
        const close_date = new Date(questions_close);
        if((open_date >= close_date)){
            console.error("handleSetDates: open date must be strictly before close date");
            return res.status(400).json({error: "open date must be strictly before close date"});
        }
        const results = await setDates(open_date, close_date);
        const dates = {open: results.questions_open, close: results.questions_close};
        res.json(dates);
    }catch(err){
        console.error("handleSetDates: Failed to change dates", err);
        res.status(500).json({ err: "Failed to change dates" });
    }
}

export async function handleSetCloseDate(req: Request, res: Response){
    try{
        if (!req.auth?.sub) {
            console.error("handleSetCloseDate: authentication requiered");
            return res.status(401).json({ error: 'Sub required' });
        }
        const sub = req.auth.sub;
        const currentUser = await getUserBySub(sub);
        if(!currentUser){
            console.error("handleSetCloseDate: currnet user not found");
            return res.status(404).json({ error: 'current user not found' });
        }
        if(currentUser.permission != "admin"){
            console.error("handleSetCloseDate: only admins can update settings");
            return res.status(403).json({ error: 'Only admins can update settings' });
        }
        const today = new Date()
        const settings = await getSettings()
        const open = new Date(settings[2])
        if(open <today){
            console.error("handleSetCloseDate: cannot set close date if game isn't started");
            return res.status(403).json({ error: 'cannot set close date if game is not started' });
        }
        const close_string = req.body.questions_close
        if(close_string == null || close_string == undefined){
            console.error("handleSetCloseDate: Close date is required");
            return res.status(403).json({ error: 'Close date is required"' });
        }
        if(typeof close_string != "string"){
            console.error("handleSetCloseDate: close date must be passed as a string")
            return res.status(400).json({ error: 'close date must be passed as a string"' });
        }
        const closeDate = new Date(close_string)
        const results  = await setCloseDate(closeDate)
        const dates = {open: results.questions_open, close: results.questions_close};
        res.json(dates);
    }
    catch(err){
        console.error("handleSetCloseDate: Failed to open questions", err);
        res.status(500).json({ err: "Failed to open questions" });
    }
}
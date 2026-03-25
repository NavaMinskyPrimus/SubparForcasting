import { addSubToUser, getUserByEmail, getUserBySub, postUser } from '../../../database/user-queries';
import type { Request, Response } from "express";

export async function handleLogin(req: Request, res: Response) {
    try{
        const sub = req.body.sub
        if (!sub) {
            return res.status(400).json({ err: 'No sub on authenticated user' });
        }
        const user = await getUserBySub(sub);
        if(user != null){
            console.log("returning existing user");
            return res.status(200).json(user);
        }
        const name = req.body?.name;
        const email = req.body?.email;
        if(name == null || email == null || name == undefined || email == undefined){
            return res.status(400).json({err: "name and email are requiered"});
        }
        const user_email = await getUserByEmail(email);
        if(user_email != null){
            console.log("updating sub-less user");
            const updated_user = await addSubToUser(name,email, user_email.permission, sub);
            return res.status(200).json(updated_user);
        }
        console.log("returning new user");

        const newuser = await postUser(name, email, "user", sub);
        return res.status(200).json(newuser);
    }catch (err) {
        console.error("Failed to log in user", err);
        res.status(500).json({ err: "Failed to login user" });
    }
}

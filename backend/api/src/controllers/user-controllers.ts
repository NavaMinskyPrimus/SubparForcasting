import { deleteUserByID, getUserByID, getUserBySub, getUsers, postUser} from '../../../database/user-queries';
import {deleteAnswersByUID} from '../../../database/answer-queries';
import type { Request, Response } from "express";

export async function handleGetUsers(req: Request, res: Response) {
    try{
        const users = await getUsers();
        res.json(users);
    }catch (err) {
        console.error("Failed to fetch users", err);
        res.status(500).json({ err: "Failed to fetch users" });
    }
}

export async function handlePostUser(req: Request, res: Response) {
    try{
        if (!req.body ){
            res.status(400).json({err: "body is undefined"});
            return
        }
        const name = req.body?.name;
        const email = req.body?.email;
        const permission = req.body?.permission;
        const sub = req.body?.sub;
        const newUser = await postUser(name, email, permission,sub);
        res.status(201).json(newUser);
    }catch(err){
         console.error("Failed to post user", err);
        res.status(500).json({ err: "Failed to post user" });
    }
}
export async function handleDeleteUser(req: Request, res: Response) {
    try{
        const id : number = req.body.userid;
        if (!req.auth?.sub) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        const sub = req.auth.sub;
        const existingUser = await getUserByID(id);
        const currentUser = await getUserBySub(sub);
        if(!currentUser){
            return res.status(404).json({ error: 'current user not found' });
        }
        if(!existingUser){
            return res.status(404).json({ error: 'User not found' });
        }
        if((existingUser.userid != currentUser.userid) && (currentUser.permission != "admin")){
            return res.status(403).json({ error: 'Only admins can delete other users' });
        }
        const questions = await deleteAnswersByUID(id)
        const removed = await deleteUserByID(id);
        res.status(201).json(removed);

    }catch(err){
        console.error("Failed to delete user", err);
        res.status(500).json({ err: "Failed to post user" });
    }
}
import { deleteUserByID, getUsers, postUser} from '../../../database/user-queries';
import {deleteAnsewersByUID} from '../../../database/answer-queries';
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
        const newUser = await postUser(name, email, permission);
        res.status(201).json(newUser);
    }catch(err){
         console.error("Failed to post user", err);
        res.status(500).json({ err: "Failed to post user" });
    }
}
export async function handleDeleteUser(req: Request, res: Response) {
    try{
        const id = req.body.userid;
        const questions = await deleteAnsewersByUID(id)
        const removed = await deleteUserByID(id);
        res.status(201).json(removed);
    }catch(err){
        console.error("Failed to delete user", err);
        res.status(500).json({ err: "Failed to post user" });
    }
}
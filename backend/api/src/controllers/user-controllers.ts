import { deleteUserWithAssociatedAnswers, getUserByID, getUserBySub, getUsers, postUser} from '../../../database/user-queries';
import {deleteAnswersByUID} from '../../../database/answer-queries';
import type { Request, Response } from "express";

export async function handleGetUsers(req: Request, res: Response) {
    try{
        const users = await getUsers();
        if (!users) {
        return res.status(404).json({ error: 'User not found' });
        }
        res.json(users);
    }catch (err) {
        console.error("Failed to fetch users", err);
        res.status(500).json({ err: "Failed to fetch users" });
    }
}
export async function  handleGetUserByID(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const numericId = parseInt(id, 10);
    if (Number.isNaN(numericId) || numericId < 0) {
      return res.status(400).json({ error: 'Invalid user id' });
    }
    const user = await getUserByID(numericId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error fetching user by id', err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function  handleGetCurrentUser(req: Request, res: Response) {
    try {
        if (!req.auth) {
            return res.status(401).json({ error: 'Not authenticated' });
        }
        const sub = req.auth.sub;
        if (!sub) {
        return res.status(400).json({ error: 'No sub on authenticated user' });
        }
        const user = await getUserBySub(sub);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.json(user);
  } catch (err) {
    console.error('Error fetching current user', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


export async function handlePostUser(req: Request, res: Response) {
    try{
        if (!req.body ){
            return res.status(400).json({err: "body is undefined"});
        }
        const name = req.body?.name;
        const email = req.body?.email;
        const permission = req.body?.permission;
        const sub = req.body?.sub;
        const nothing = [undefined, null]
        if((permission != "user" && permission != "admin")){
             res.status(400).json({ err: "permission must be user or admin" });
        }
        if((name in nothing) || (email in nothing) || (sub in nothing)){
            res.status(400).json({ err: "null/undefined param" });
        }
        const id : number = req.body.userid;
        if (!req.auth?.sub) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        const current_sub = req.auth.sub;
        const currentUser = await getUserBySub(current_sub);
        if(!currentUser){
            console.log("user not found")
            console.log(sub)

            return res.status(404).json({ error: 'current user not found' });
        }
        if(currentUser.permission != "admin"){
            return res.status(403).json({error: 'only admins can post users'})
        }
        const newUser = await postUser(name, email, permission,sub);
        res.status(200).json(newUser);
    }catch(err){
        console.error("Failed to post user", err);
        res.status(500).json({ err: "Failed to post user" });
    }
}

export async function handleDeleteUser(req: Request, res: Response) {
    try{
        if (!req.body ){
            res.status(400).json({err: "body is undefined"});
            return
        }
        const id : number = req.body.userid;
        if (!req.auth?.sub) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        const sub = req.auth.sub;
        const currentUser = await getUserBySub(sub);
        if(!currentUser){
            return res.status(404).json({ error: 'current user not found' });
        }
        const existingUser = await getUserByID(id);
        if(!existingUser){
            return res.status(404).json({ error: 'User not found' });
        }
        if((existingUser.userid != currentUser.userid) && (currentUser.permission != "admin")){
            return res.status(403).json({ error: 'Only admins can delete other users' });
        }
        const removed = await deleteUserWithAssociatedAnswers(id);
        if(removed == null){
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(removed);

    }catch(err){
        console.error("Failed to delete user", err);
        res.status(500).json({ err: "Failed to delete user" });
    }
}
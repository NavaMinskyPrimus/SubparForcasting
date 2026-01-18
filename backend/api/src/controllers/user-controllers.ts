import { getUsers } from '../../../database/user-queries';
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
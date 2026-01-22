import { Router } from 'express';
import { handleDeleteUser, handleGetUsers, handlePostUser } from '../controllers/user-controllers';
import {requireGoogleAuth} from '../middleware/requireGoogleAuth';
const userRouter: Router = Router();
userRouter.get("/", handleGetUsers);
userRouter.post("/", handlePostUser);
userRouter.delete("/", requireGoogleAuth, handleDeleteUser);

export default userRouter;
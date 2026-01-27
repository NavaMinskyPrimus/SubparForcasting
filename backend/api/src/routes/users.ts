import { Router } from 'express';
import { handleGetCurrentUser,handleGetUserByID,handleDeleteUser, handleGetUsers, handlePostUser } from '../controllers/user-controllers';
import {requireGoogleAuth} from '../middleware/requireGoogleAuth';
const userRouter: Router = Router();
userRouter.get("/", requireGoogleAuth, handleGetUsers);
userRouter.get('/me', requireGoogleAuth, handleGetCurrentUser);
userRouter.get("/:id", requireGoogleAuth, handleGetUserByID);
userRouter.post("/", requireGoogleAuth, handlePostUser);
userRouter.delete("/", requireGoogleAuth, handleDeleteUser);

export default userRouter;
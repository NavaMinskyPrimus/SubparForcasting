import { Router } from 'express';
import { handleDeleteUser, handleGetUsers, handlePostUser } from '../controllers/user-controllers';
const userRouter: Router = Router();
userRouter.get("/", handleGetUsers);
userRouter.post("/", handlePostUser);
userRouter.delete("/", handleDeleteUser);

export default userRouter;
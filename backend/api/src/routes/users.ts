import { Router } from 'express';
import { handleGetUsers } from '../controllers/user-controllers';
const userRouter: Router = Router();
userRouter.get("/", handleGetUsers);

export default userRouter;
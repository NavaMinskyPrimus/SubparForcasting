import { Router } from 'express';
import {requireGoogleAuth} from '../middleware/requireGoogleAuth';
import { handleLogin } from '../controllers/login-controller';
const loginRouter: Router = Router();

loginRouter.put("/", handleLogin);


export default loginRouter;
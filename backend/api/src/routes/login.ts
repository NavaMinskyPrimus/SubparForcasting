import { Router } from 'express';
import {requireGoogleAuth} from '../middleware/requireGoogleAuth';
import { handleLogin } from '../controllers/login-controller';
const loginRoutes: Router = Router();

loginRoutes.put("/", handleLogin);


export default loginRoutes;
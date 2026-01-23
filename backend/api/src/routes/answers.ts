import { Router } from 'express';
import {requireGoogleAuth} from '../middleware/requireGoogleAuth';
import { handleGetAnswersByUID } from '../controllers/answer-controllers';
const answerRoutes: Router = Router();
answerRoutes.get("/", handleGetAnswersByUID);


export default answerRoutes;
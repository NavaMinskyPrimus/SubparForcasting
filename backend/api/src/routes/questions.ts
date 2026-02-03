import { Router } from 'express';
import {requireGoogleAuth} from '../middleware/requireGoogleAuth';
import {handleGetQuestion, handleGetQuestionByYear} from '../controllers/question-controllers'
const questionsRoutes: Router = Router();

questionsRoutes.get("/year", requireGoogleAuth, handleGetQuestionByYear);
questionsRoutes.get("/", requireGoogleAuth, handleGetQuestion);


export default questionsRoutes;
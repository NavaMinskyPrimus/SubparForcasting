import { Router } from 'express';
import {requireGoogleAuth} from '../middleware/requireGoogleAuth';
import { handleDeleteAnswer, handleGetAnswersByUID, handlePostAnswer } from '../controllers/answer-controllers';
const answerRoutes: Router = Router();
answerRoutes.get("/", requireGoogleAuth, handleGetAnswersByUID);
answerRoutes.post("/", requireGoogleAuth, handlePostAnswer);
answerRoutes.delete("/", requireGoogleAuth, handleDeleteAnswer);


export default answerRoutes;
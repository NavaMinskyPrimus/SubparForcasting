import { Router } from 'express';
import {requireGoogleAuth} from '../middleware/requireGoogleAuth';
import { handleDeleteAnswer, handleGetAnswersByUID, handlePostAnswer, handlePostAnswers } from '../controllers/answer-controllers';
const answerRoutes: Router = Router();
answerRoutes.get("/", requireGoogleAuth, handleGetAnswersByUID);
answerRoutes.post("/one", requireGoogleAuth, handlePostAnswer);
answerRoutes.delete("/", requireGoogleAuth, handleDeleteAnswer);
answerRoutes.post("/many", requireGoogleAuth, handlePostAnswers);


export default answerRoutes;
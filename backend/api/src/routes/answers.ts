import { Router } from 'express';
import {requireGoogleAuth} from '../middleware/requireGoogleAuth';
import { handleDeleteAnswer, handleGetAnswersByUID, handlePostPutAnswer } from '../controllers/answer-controllers';
const answerRoutes: Router = Router();
answerRoutes.get("/", handleGetAnswersByUID);
answerRoutes.post("/", requireGoogleAuth, handlePostPutAnswer);
answerRoutes.delete("/", requireGoogleAuth, handleDeleteAnswer);


export default answerRoutes;
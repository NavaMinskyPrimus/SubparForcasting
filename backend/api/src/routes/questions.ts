import { Router } from 'express';
import {requireGoogleAuth} from '../middleware/requireGoogleAuth';
import {handleDeleteQuestion, handleGetQuestion, handleGetQuestionByYear, handleGetQuestionsWithAnswers, handlePostQuestion, handlePutQuestion, handleValidation} from '../controllers/question-controllers'
const questionsRoutes: Router = Router();

questionsRoutes.get("/year", requireGoogleAuth, handleGetQuestionByYear)
questionsRoutes.get("/with-answers", requireGoogleAuth, handleGetQuestionsWithAnswers)
questionsRoutes.get("/", requireGoogleAuth, handleGetQuestion)
questionsRoutes.post("/", requireGoogleAuth, handlePostQuestion)
questionsRoutes.delete("/", requireGoogleAuth, handleDeleteQuestion)
questionsRoutes.put("/", requireGoogleAuth, handlePutQuestion)
questionsRoutes.put("/isvalid", requireGoogleAuth, handleValidation)

export default questionsRoutes;
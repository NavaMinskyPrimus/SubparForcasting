import { Router } from 'express';
import {requireGoogleAuth} from '../middleware/requireGoogleAuth';
import {handleDeleteQuestion, handleGetQuestion, handleGetQuestionByYear, handleGetQuestionsWithAllAnswers, handleGetQuestionsWithUserAnswers, handlePostQuestion, handlePutQuestion, handleValidation} from '../controllers/question-controllers'
const questionsRoutes: Router = Router();

questionsRoutes.get("/year", requireGoogleAuth, handleGetQuestionByYear)
questionsRoutes.get("/with-user-answers", requireGoogleAuth, handleGetQuestionsWithUserAnswers)
questionsRoutes.get("/with-all-answers", requireGoogleAuth, handleGetQuestionsWithAllAnswers)
questionsRoutes.get("/", requireGoogleAuth, handleGetQuestion)
questionsRoutes.post("/", requireGoogleAuth, handlePostQuestion)
questionsRoutes.delete("/", requireGoogleAuth, handleDeleteQuestion)
questionsRoutes.put("/", requireGoogleAuth, handlePutQuestion)
questionsRoutes.put("/isvalid", requireGoogleAuth, handleValidation)

export default questionsRoutes;
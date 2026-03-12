import { Router } from 'express';
import { requireGoogleAuth } from '../middleware/requireGoogleAuth';
import { handleComputeResults, handleGetResults } from '../controllers/results-controllers';

const resultsRouter: Router = Router();

resultsRouter.get('/', requireGoogleAuth, handleGetResults);
resultsRouter.post('/compute', requireGoogleAuth, handleComputeResults);

export default resultsRouter;

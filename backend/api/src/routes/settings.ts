import { Router } from 'express';
import {requireGoogleAuth} from '../middleware/requireGoogleAuth';
import { handleGetDates, handleSetDates } from '../controllers/setting-controllers';
const settingsRoutes: Router = Router();

settingsRoutes.get("/dates", requireGoogleAuth, handleGetDates);
settingsRoutes.post("/dates", requireGoogleAuth, handleSetDates);

export default settingsRoutes
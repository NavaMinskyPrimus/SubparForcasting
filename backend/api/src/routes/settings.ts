import { Router } from 'express';
import {requireGoogleAuth} from '../middleware/requireGoogleAuth';
import { handleGetDates, handleSetCloseDate, handleSetDates } from '../controllers/setting-controllers';
const settingsRoutes: Router = Router();

settingsRoutes.get("/dates", requireGoogleAuth, handleGetDates);
settingsRoutes.post("/dates", requireGoogleAuth, handleSetDates);
settingsRoutes.post("/close", requireGoogleAuth, handleSetCloseDate);

export default settingsRoutes
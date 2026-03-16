import { Router } from 'express';
import {requireGoogleAuth} from '../middleware/requireGoogleAuth';
import { handleGetDates, handleSetCloseDate, handleSetDates, handleGetReleasedYear, handleSetReleasedYear } from '../controllers/setting-controllers';
const settingsRoutes: Router = Router();

settingsRoutes.get("/dates", requireGoogleAuth, handleGetDates);
settingsRoutes.post("/dates", requireGoogleAuth, handleSetDates);
settingsRoutes.post("/close", requireGoogleAuth, handleSetCloseDate);
settingsRoutes.get("/released-year", handleGetReleasedYear);
settingsRoutes.put("/released-year", requireGoogleAuth, handleSetReleasedYear);

export default settingsRoutes
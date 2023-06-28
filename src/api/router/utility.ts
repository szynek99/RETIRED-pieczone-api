import { Router } from 'express';
import utilityController from 'api/controllers/utility';

const utilityRouter = Router();

utilityRouter.get('/health', utilityController.getHealth);

export default utilityRouter;

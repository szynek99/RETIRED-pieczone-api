import * as dotenv from 'dotenv';
import { Router } from 'express';
import offerRules from 'api/validators/offer';
import { verifyToken } from 'api/middleware/user';
import offerController from 'api/controllers/offer';
import { checkRequired } from 'api/middleware/common';

dotenv.config();

const offerRouter = Router();

offerRouter.post(
  '/',
  offerRules.addSingle,
  [verifyToken, checkRequired],
  offerController.postOffer,
);

offerRouter.get('/', offerRules.getAll, [verifyToken, checkRequired], offerController.getAllOffers);

export default offerRouter;

import * as dotenv from 'dotenv';
import { Router } from 'express';
import offerRules from 'api/validators/offer';
import { verifyToken } from 'api/middleware/user';
import offerController from 'api/controllers/offer';
import { checkRequired } from 'api/middleware/common';
import { checkResourceExistance } from 'api/middleware/offer';

dotenv.config();

const offerRouter = Router();

offerRouter.post(
  '/',
  offerRules.addSingle,
  [verifyToken, checkRequired],
  offerController.postOffer,
);

offerRouter.get('/', offerRules.getAll, [verifyToken, checkRequired], offerController.getAllOffers);

offerRouter.get(
  '/:id',
  offerRules.getSingle,
  [verifyToken, checkRequired],
  offerController.getOffer,
);

offerRouter.put(
  '/:id',
  offerRules.updateSingle,
  [verifyToken, checkRequired, checkResourceExistance],
  offerController.putOffer,
);

offerRouter.delete(
  '/:id',
  offerRules.getSingle,
  [verifyToken, checkRequired, checkResourceExistance],
  offerController.deleteOffer,
);

export default offerRouter;

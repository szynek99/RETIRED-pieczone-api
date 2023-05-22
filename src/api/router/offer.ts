import * as dotenv from 'dotenv';
import { Router } from 'express';
import offerRules from 'api/validators/offer';
import offerController from 'api/controllers/offer';
import { checkRequired } from 'api/middleware/common';
import { isAdmin, verifyToken } from 'api/middleware/user';
import { checkResourceExistance } from 'api/middleware/offer';

dotenv.config();

const offerRouter = Router();

offerRouter.post(
  '/',
  offerRules.addSingle,
  [verifyToken, isAdmin, checkRequired],
  offerController.postOffer,
);

offerRouter.get(
  '/',
  offerRules.getAll,
  [verifyToken, isAdmin, checkRequired],
  offerController.getAllOffers,
);

offerRouter.get(
  '/:id',
  offerRules.getSingle,
  [verifyToken, isAdmin, checkRequired],
  offerController.getOffer,
);

offerRouter.put(
  '/:id',
  offerRules.updateSingle,
  [verifyToken, isAdmin, checkRequired, checkResourceExistance],
  offerController.putOffer,
);

offerRouter.delete(
  '/:id',
  offerRules.getSingle,
  [verifyToken, isAdmin, checkRequired, checkResourceExistance],
  offerController.deleteOffer,
);

export default offerRouter;

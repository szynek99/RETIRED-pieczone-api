import * as dotenv from 'dotenv';
import { Router } from 'express';
import orderRules from 'api/validators/order';
import { verifyToken } from 'api/middleware/auth';
import orderController from 'api/controllers/order';
import { checkRequired } from 'api/middleware/common';
import { checkValidFlavour } from 'api/middleware/order';

dotenv.config();

const orderRouter = Router();

orderRouter.post(
  '/',
  orderRules.addSingle,
  [checkRequired, checkValidFlavour],
  orderController.postOrder,
);

orderRouter.get('/', orderRules.getAll, [verifyToken, checkRequired], orderController.getOrders);

orderRouter.get(
  '/:id',
  orderRules.getSingle,
  [verifyToken, checkRequired],
  orderController.getOrder,
);

export default orderRouter;

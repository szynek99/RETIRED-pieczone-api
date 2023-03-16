import * as dotenv from 'dotenv';
import { Router } from 'express';
import orderRules from 'api/validators/order';
import { verifyToken } from 'api/middleware/auth';
import orderController from 'api/controllers/order';
import { checkRequired } from 'api/middleware/common';

dotenv.config();
const orderRouter = Router();

orderRouter.post('/', orderRules.addSingle, [checkRequired], orderController.postOrder);

orderRouter.get(
  '/:hash',
  orderRules.getSingle,
  [verifyToken, checkRequired],
  orderController.getOrder,
);

export default orderRouter;

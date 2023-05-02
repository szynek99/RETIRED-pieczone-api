import * as dotenv from 'dotenv';
import { Router } from 'express';
import orderRules from 'api/validators/order';
import { verifyToken } from 'api/middleware/user';
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

orderRouter.get(
  'public/:hash',
  orderRules.getSingleByHash,
  [checkRequired],
  orderController.getOrderPublic,
);

orderRouter.get('/', orderRules.getAll, [verifyToken, checkRequired], orderController.getOrders);

orderRouter.get(
  '/:id',
  orderRules.getSingle,
  [verifyToken, checkRequired],
  orderController.getOrder,
);

orderRouter.put(
  '/:id',
  orderRules.updateSingle,
  [verifyToken, checkRequired],
  orderController.putOrder,
);

orderRouter.delete(
  '/',
  orderRules.getMany,
  [verifyToken, checkRequired],
  orderController.deleteOrders,
);

orderRouter.delete(
  '/:id',
  orderRules.getSingle,
  [verifyToken, checkRequired],
  orderController.deleteOrder,
);

export default orderRouter;

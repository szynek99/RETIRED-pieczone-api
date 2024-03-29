import * as dotenv from 'dotenv';
import { Router } from 'express';
import orderRules from 'api/validators/order';
import orderController from 'api/controllers/order';
import { checkRequired } from 'api/middleware/common';
import { isAdmin, verifyToken } from 'api/middleware/user';
import { checkResourceExistance, checkValidFlavour } from 'api/middleware/order';

dotenv.config();

const orderRouter = Router();

orderRouter.post(
  '/',
  orderRules.addSingle,
  [checkRequired, checkValidFlavour],
  orderController.postOrder,
);

orderRouter.get(
  '/public/:hash',
  orderRules.getSingleByHash,
  [checkRequired],
  orderController.getOrderPublic,
);

orderRouter.get(
  '/',
  orderRules.getAll,
  [verifyToken, isAdmin, checkRequired],
  orderController.getOrders,
);

orderRouter.get(
  '/:id',
  orderRules.getSingle,
  [verifyToken, isAdmin, checkRequired],
  orderController.getOrder,
);

orderRouter.put(
  '/:id',
  orderRules.updateSingle,
  [verifyToken, isAdmin, checkRequired, checkResourceExistance, checkValidFlavour],
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
  [verifyToken, checkRequired, checkResourceExistance],
  orderController.deleteOrder,
);

export default orderRouter;

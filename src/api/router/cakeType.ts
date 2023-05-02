import * as dotenv from 'dotenv';
import { Router } from 'express';
import { verifyToken } from 'api/middleware/user';
import cakeTypeRules from 'api/validators/cakeType';
import { checkRequired } from 'api/middleware/common';
import cakeTypeController from 'api/controllers/cakeType';
import { checkDuplicateValue } from 'api/middleware/cakeType';

dotenv.config();

const cakeTypeRouter = Router();

cakeTypeRouter.get(
  '/',
  cakeTypeRules.getAll,
  [verifyToken, checkRequired],
  cakeTypeController.getAllTypes,
);

cakeTypeRouter.get(
  '/:id',
  cakeTypeRules.getSingle,
  [verifyToken, checkRequired],
  cakeTypeController.getType,
);

cakeTypeRouter.put(
  '/:id',
  cakeTypeRules.updateSingle,
  [verifyToken, checkRequired],
  cakeTypeController.putType,
);

cakeTypeRouter.post(
  '/',
  cakeTypeRules.addSingle,
  [verifyToken, checkRequired, checkDuplicateValue],
  cakeTypeController.postType,
);

cakeTypeRouter.delete(
  '/:id',
  cakeTypeRules.getSingle,
  [verifyToken, checkRequired],
  cakeTypeController.deleteType,
);

export default cakeTypeRouter;

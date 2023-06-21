import * as dotenv from 'dotenv';
import { Router } from 'express';
import cakeTypeRules from 'api/validators/cakeType';
import { checkRequired } from 'api/middleware/common';
import cakeTypeController from 'api/controllers/cakeType';
import { isAdmin, verifyToken } from 'api/middleware/user';
import {
  checkDuplicateValue,
  checkResourceExistance,
  checkResourceUsage,
} from 'api/middleware/cakeType';

dotenv.config();

const cakeTypeRouter = Router();

cakeTypeRouter.get('/public', cakeTypeController.getAllTypesPublic);

cakeTypeRouter.get(
  '/',
  cakeTypeRules.getAll,
  [verifyToken, isAdmin, checkRequired],
  cakeTypeController.getAllTypes,
);

cakeTypeRouter.get(
  '/:id',
  cakeTypeRules.getSingle,
  [verifyToken, isAdmin, checkRequired],
  cakeTypeController.getType,
);

cakeTypeRouter.put(
  '/:id',
  cakeTypeRules.updateSingle,
  [verifyToken, isAdmin, checkRequired, checkResourceExistance],
  cakeTypeController.putType,
);

cakeTypeRouter.post(
  '/',
  cakeTypeRules.addSingle,
  [verifyToken, isAdmin, checkRequired, checkDuplicateValue],
  cakeTypeController.postType,
);

cakeTypeRouter.delete(
  '/:id',
  cakeTypeRules.getSingle,
  [verifyToken, checkRequired, checkResourceExistance, checkResourceUsage],
  cakeTypeController.deleteType,
);

export default cakeTypeRouter;

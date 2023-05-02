import { Router } from 'express';
import { ROUTES } from 'constants/routes';
import userRules from 'api/validators/user';
import userController from 'api/controllers/user';
import { checkRequired } from 'api/middleware/common';
import { checkDuplicateUsername } from 'api/middleware/user';

const userRouter = Router();

userRouter.post(
  ROUTES.USER.REGISTER,
  userRules.register,
  [checkRequired, checkDuplicateUsername],
  userController.register,
);

userRouter.post(ROUTES.USER.LOGIN, userRules.login, [checkRequired], userController.login);

export default userRouter;

import { Router } from 'express';
import userRules from 'api/validators/user';
import userController from 'api/controllers/user';
import { checkRequired } from 'api/middleware/common';
import { checkDuplicateUsername } from 'api/middleware/user';

const userRouter = Router();

userRouter.post(
  '/register',
  userRules.register,
  [checkRequired, checkDuplicateUsername],
  userController.register,
);

userRouter.post('/login', userRules.login, [checkRequired], userController.login);

export default userRouter;

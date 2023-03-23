import { Router } from 'express';
import { ROUTES } from 'constants/routes';
import authRules from 'api/validators/auth';
import authController from 'api/controllers/auth';
import { checkRequired } from 'api/middleware/common';
import { checkDuplicateUsername } from 'api/middleware/auth';

const authRouter = Router();

authRouter.post(
  ROUTES.AUTH.REGISTER,
  authRules.register,
  [checkRequired, checkDuplicateUsername],
  authController.register,
);

authRouter.post(ROUTES.AUTH.LOGIN, authRules.login, [checkRequired], authController.login);

export default authRouter;

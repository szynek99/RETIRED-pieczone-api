import { Router } from 'express';
import { ROUTES } from 'constants/routes';
import authRules from 'api/validators/auth';
import AuthController from 'api/controllers/auth';
import { checkRequired } from 'api/middleware/common';
import { checkDuplicateUsername } from 'api/middleware/auth';

const authRouter = Router();

authRouter.post(
  ROUTES.AUTH.REGISTER,
  authRules.register,
  [checkRequired, checkDuplicateUsername],
  AuthController.register,
);

authRouter.post(ROUTES.AUTH.LOGIN, authRules.login, [checkRequired], AuthController.login);

export default authRouter;

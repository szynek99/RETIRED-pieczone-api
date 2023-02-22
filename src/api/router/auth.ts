import { Router } from 'express';
import authRules from 'api/validators/auth';
import AuthController from 'api/controllers/auth';
import { ROUTES } from 'constants/routes';
import { checkDuplicateUsername } from 'api/middleware/auth';

const authRouter = Router();

authRouter.post(
  ROUTES.AUTH.REGISTER,
  authRules.register,
  [checkDuplicateUsername],
  AuthController.register,
);

authRouter.post(ROUTES.AUTH.LOGIN, authRules.login, AuthController.login);

export default authRouter;

import { Router } from 'express';
import authRules from 'api/validators/auth';
import AuthController from 'api/controllers/auth';
import { ROUTES } from 'constants/routes';
import { checkDuplicateUsername } from 'api/middleware/auth';

const authRouter = Router();

authRouter.post(
  ROUTES.AUTH.SIGN_UP,
  authRules.signUp,
  [checkDuplicateUsername],
  AuthController.signUp,
);

authRouter.post(ROUTES.AUTH.SIGN_IN, authRules.signIn, AuthController.signIn);

export default authRouter;

import { Router } from 'express';
import authRules from 'api/validators/auth';
import { SignInController, SignUpController } from 'api/controllers/auth';
import { ROUTES } from 'constants/routes';
import { checkDuplicateUsername } from 'api/middleware/auth';

const authRouter = Router();

authRouter.post(ROUTES.AUTH.SIGN_UP, authRules.signUp, checkDuplicateUsername, SignUpController);

authRouter.post(ROUTES.AUTH.SIGN_IN, authRules.signIn, SignInController);

export default authRouter;

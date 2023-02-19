import { Router } from 'express';
import authRules from 'api/validators/auth';
import { SignInController, SignUpController } from 'api/controllers/auth';
import { ROUTES } from 'constants/routes';

const authRouter = Router();

authRouter.post(ROUTES.AUTH.SIGN_UP, authRules.signUp, SignUpController);

authRouter.post(ROUTES.AUTH.SIGN_IN, authRules.signIn, SignInController);

export default authRouter;

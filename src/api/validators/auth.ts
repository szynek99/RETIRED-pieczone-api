import { ROLES } from 'constants/auth';
import { check } from 'express-validator';

const authRules = {
  singup: [
    check('username').isString().withMessage('Nieprawidłowa wartość'),
    check('password').isString().withMessage('Nieprawidłowa wartość'),
    check('role')
      .custom((value) => {
        if (!ROLES.includes(value)) {
          throw new Error('Nieprawidłowa wartość');
        }
        return true;
      })
      .withMessage('Nieprawidłowa wartość'),
  ],
  singin: [
    check('username').isString().withMessage('Nieprawidłowa wartość'),
    check('password').isString().withMessage('Nieprawidłowa wartość'),
  ],
};

export default authRules;

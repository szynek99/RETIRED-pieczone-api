import { ROLES } from 'constants/auth';
import { check } from 'express-validator';

const authRules = {
  register: [
    check('username')
      .isString()
      .withMessage('Nieprawidłowa wartość')
      .isLength({ min: 2 })
      .withMessage('Nieprawidłowa wartość'),
    check('password')
      .isString()
      .withMessage('Nieprawidłowa wartość')
      .isLength({ min: 5 })
      .withMessage('Nieprawidłowa wartość'),
    check('role')
      .custom((value) => {
        if (!ROLES.includes(value) || value === ROLES[0]) {
          throw new Error();
        }
        return true;
      })
      .withMessage('Nieprawidłowa wartość'),
  ],
  login: [
    check('username')
      .isString()
      .withMessage('Nieprawidłowa wartość')
      .isLength({ min: 2 })
      .withMessage('Nieprawidłowa wartość'),
    check('password')
      .isString()
      .withMessage('Nieprawidłowa wartość')
      .isLength({ min: 5 })
      .withMessage('Nieprawidłowa wartość'),
  ],
};

export default authRules;

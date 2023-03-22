import { ROLES } from 'constants/auth';
import { check } from 'express-validator';
import { BASIC_STRING_RULE } from 'constants/common';

const authRules = {
  register: [
    check('username')
      .isString()
      .withMessage('Zły format')
      .isLength({ min: 2 })
      .withMessage('Za krótkie'),
    check('password')
      .isString()
      .withMessage('Zły format')
      .isLength({ min: 5 })
      .withMessage('Za krótkie'),
    BASIC_STRING_RULE('role')
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
      .withMessage('Zły typ zmiennej')
      .isLength({ min: 2 })
      .withMessage('Za krótkie'),
    check('password')
      .isString()
      .withMessage('Zły format')
      .isLength({ min: 5 })
      .withMessage('Za krótkie'),
  ],
};

export default authRules;

import { ROLES } from 'constants/user';
import { BASIC_STRING_RULE } from 'api/validators/common';
import { PASSWORD_RULE, USERNAME_RULE } from './constants';

const authRules = {
  register: [
    USERNAME_RULE,
    PASSWORD_RULE,
    BASIC_STRING_RULE('role')
      .custom((value) => {
        if (!ROLES.includes(value) || value === ROLES[0]) {
          throw new Error();
        }
        return true;
      })
      .withMessage('Nieprawidłowa wartość'),
  ],
  login: [USERNAME_RULE, PASSWORD_RULE],
};

export default authRules;

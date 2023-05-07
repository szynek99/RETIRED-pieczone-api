import { check } from 'express-validator';
import { GET_ATTRIBUTES } from 'constants/cakeType';
import { GET_ALL_RULES } from 'api/validators/common';

const cakeTypeRules = {
  getSingle: [check('id').isNumeric().withMessage('Nieprawidłowa wartość')],
  getAll: GET_ALL_RULES(GET_ATTRIBUTES),
  addSingle: [
    check('name').isString().withMessage('Nieprawidłowa wartość'),
    check('value').isString().withMessage('Nieprawidłowa wartość'),
    check('accessible').isBoolean().withMessage('Nieprawidłowa wartość'),
    check('customizable').isBoolean().withMessage('Nieprawidłowa wartość'),
    check('description')
      .isString()
      .optional({ nullable: true })
      .withMessage('Nieprawidłowa wartość'),
  ],
  updateSingle: [
    check('id').isNumeric().withMessage('Nieprawidłowa wartość'),
    check('name').isString().withMessage('Nieprawidłowa wartość'),
    check('accessible').isBoolean().withMessage('Nieprawidłowa wartość'),
    check('customizable').isBoolean().withMessage('Nieprawidłowa wartość'),
    check('description')
      .isString()
      .optional({ nullable: true })
      .withMessage('Nieprawidłowa wartość'),
  ],
};
export default cakeTypeRules;

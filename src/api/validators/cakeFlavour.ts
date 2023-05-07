import { check, param } from 'express-validator';
import { GET_ALL_RULES } from 'api/validators/common';
import { GET_ATTRIBUTES } from 'constants/cakeFlavour';

const cakeFlavourRules = {
  getSingle: [param('id').isNumeric().withMessage('Nieprawidłowa wartość')],
  getAll: GET_ALL_RULES(GET_ATTRIBUTES),
  addSingle: [
    check('name').isString().withMessage('Nieprawidłowa wartość'),
    check('value').isString().withMessage('Nieprawidłowa wartość'),
    check('accessible').isBoolean().withMessage('Nieprawidłowa wartość'),
  ],
  updateSingle: [
    check('id').isNumeric().withMessage('Nieprawidłowa wartość'),
    check('name').isString().withMessage('Nieprawidłowa wartość'),
    check('accessible').isBoolean().withMessage('Nieprawidłowa wartość'),
  ],
};
export default cakeFlavourRules;

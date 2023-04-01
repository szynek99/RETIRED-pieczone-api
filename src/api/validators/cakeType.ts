import { check } from 'express-validator';

const cakeTypeRules = {
  getSingle: [check('id').isNumeric().withMessage('Nieprawidłowa wartość')],
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
    check('name').isString().optional({ nullable: true }).withMessage('Nieprawidłowa wartość'),
    check('accessible')
      .isBoolean()
      .optional({ nullable: true })
      .withMessage('Nieprawidłowa wartość'),
    check('customizable')
      .isBoolean()
      .optional({ nullable: true })
      .withMessage('Nieprawidłowa wartość'),
    check('description')
      .isString()
      .optional({ nullable: true })
      .withMessage('Nieprawidłowa wartość'),
  ],
};
export default cakeTypeRules;

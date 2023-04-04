import { check, query } from 'express-validator';

const cakeTypeRules = {
  getSingle: [check('id').isNumeric().withMessage('Nieprawidłowa wartość')],
  getAll: [
    query('page')
      .isInt({ min: 0 })
      .optional({ nullable: true })
      .withMessage('Nieprawidłowa wartość'),
    query('pageSize')
      .isInt({ min: 0 })
      .optional({ nullable: true })
      .withMessage('Nieprawidłowa wartość'),
    check('order')
      .isString()
      .optional({ nullable: true })
      .custom((value) => {
        if (value === 'ASC' || value === 'DESC') {
          return true;
        }
        return false;
      })
      .withMessage('Nieprawidłowa wartość'),
    check('field')
      .isString()
      .optional({ nullable: true })
      .custom((value) => {
        if (['name', 'accessible', 'customizable', 'id'].includes(value)) {
          return true;
        }
        return false;
      })
      .withMessage('Nieprawidłowa wartość'),
    check('filter').isString().optional({ nullable: true }).withMessage('Nieprawidłowa wartość'),
  ],
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

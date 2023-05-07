import { check, query } from 'express-validator';

// eslint-disable-next-line import/prefer-default-export
export const BASIC_STRING_RULE = (name: string) =>
  check(name)
    .isString()
    .withMessage('Nieprawidłowa wartość')
    .bail()
    .isLength({ min: 1 })
    .withMessage('Za krótkie');

export const GET_ALL_RULES = (sortAttributes: string[]) => [
  query('page').isInt({ min: 0 }).optional({ nullable: true }).withMessage('Nieprawidłowa wartość'),
  query('pageSize')
    .isInt({ min: 0 })
    .optional({ nullable: true })
    .withMessage('Nieprawidłowa wartość'),
  query('order')
    .isString()
    .optional({ nullable: true })
    .custom((value) => {
      if (value === 'ASC' || value === 'DESC') {
        return true;
      }
      return false;
    })
    .withMessage('Nieprawidłowa wartość'),
  query('field')
    .isString()
    .optional({ nullable: true })
    .custom((value) => {
      if (sortAttributes.includes(value)) {
        return true;
      }
      return false;
    })
    .withMessage('Nieprawidłowa wartość'),
  query('filter').isString().optional({ nullable: true }).withMessage('Nieprawidłowa wartość'),
];

import { check } from 'express-validator';

// eslint-disable-next-line import/prefer-default-export
export const BASIC_STRING_RULE = (name: string) =>
  check(name)
    .isString()
    .withMessage('Zły format')
    .bail()
    .isLength({ min: 1 })
    .withMessage('Za krótkie');

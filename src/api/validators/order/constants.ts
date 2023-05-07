import { param } from 'express-validator';

// eslint-disable-next-line import/prefer-default-export
export const ID_RULE = param('id')
  .isString()
  .matches(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/)
  .withMessage('Nieprawidłowa wartość');

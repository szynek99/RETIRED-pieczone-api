/* eslint-disable no-shadow */

import { check } from 'express-validator';
import { BASIC_STRING_RULE } from 'api/validators/common';
import { CAKE_SHAPE, SPONGE_COLOUR } from 'constants/order';

// eslint-disable-next-line import/prefer-default-export
export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNPROCESSABLE = 422,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
}

export const PRIMARY_VALIDATION = [
  BASIC_STRING_RULE('firstname'),
  BASIC_STRING_RULE('surname'),
  BASIC_STRING_RULE('phoneNumber').isMobilePhone('pl-PL').withMessage('Nieprawidłowa wartość'),
  check('occasion').isString().optional({ nullable: true }).withMessage('Nieprawidłowa wartość'),
  BASIC_STRING_RULE('cakeType'),
  check('cakeFlavour').isString().optional({ nullable: true }).withMessage('Nieprawidłowa wartość'),
  BASIC_STRING_RULE('spongeColour')
    .custom((value) => {
      if (!SPONGE_COLOUR.includes(value)) {
        throw new Error();
      }
      return true;
    })
    .withMessage('Nieprawidłowa wartość'),
  check('cakeWeight').isFloat({ min: 0 }).withMessage('Nieprawidłowa wartość'),
  BASIC_STRING_RULE('cakeShape')
    .custom((value) => {
      if (!CAKE_SHAPE.includes(value)) {
        throw new Error();
      }
      return true;
    })
    .withMessage('Nieprawidłowa wartość'),
  check('cakeInscription')
    .isString()
    .optional({ nullable: true })
    .withMessage('Nieprawidłowa wartość'),
  check('alcoholAllowed').isBoolean().withMessage('Nieprawidłowa wartość'),
  check('commentsToOrder')
    .isString()
    .optional({ nullable: true })
    .withMessage('Nieprawidłowa wartość'),
];

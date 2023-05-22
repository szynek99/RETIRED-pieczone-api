import isArray from 'lodash/isArray';
import { param, check } from 'express-validator';
import { BASIC_STRING_RULE } from 'api/validators/common';
import { CAKE_SHAPE, SPONGE_COLOUR } from 'constants/order';

export const ID_RULE = param('id').isUUID(4).withMessage('Nieprawidłowa wartość');

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
  check('image')
    .custom((_, { req: { files } }) => {
      if (files && files.image) {
        if (isArray(files.image)) {
          return false;
        }
        if (!files.image.mimetype.startsWith('image')) {
          return false;
        }
        return true;
      }
      return true;
    })
    .withMessage('Dozwolone jest tylko jeden plik graficzny')
    .bail()
    .custom((_, { req: { files } }) => {
      if (files && files.image) {
        if (files.image.size < 5000000) {
          return true;
        }
        return false;
      }
      return true;
    })
    .withMessage('Zdjęcie za duże, maksymalny rozmiar to 5MB'),
];

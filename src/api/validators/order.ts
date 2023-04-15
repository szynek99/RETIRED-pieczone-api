import { check, query } from 'express-validator';
import { BASIC_STRING_RULE } from 'api/validators/common';
import { CAKE_SHAPE, SPONGE_COLOUR } from 'constants/order';
import { isArray } from 'lodash';

const orderRules = {
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
    BASIC_STRING_RULE('firstname'),
    BASIC_STRING_RULE('surname'),
    BASIC_STRING_RULE('phoneNumber').isMobilePhone('pl-PL').withMessage('Nieprawidłowa wartość'),
    check('occasion').isString().optional({ nullable: true }).withMessage('Nieprawidłowa wartość'),
    BASIC_STRING_RULE('cakeType'),
    BASIC_STRING_RULE('cakeFlavour'),
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
    check('alcoholAllowed').isBoolean().withMessage('Zły format'),
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
  ],
  getSingle: [
    check('hash')
      .isString()
      .withMessage('Nieprawidłowa wartość')
      .bail()
      .isLength({ min: 21, max: 21 })
      .withMessage('Nieprawidłowa wartość'),
  ],
};

export default orderRules;

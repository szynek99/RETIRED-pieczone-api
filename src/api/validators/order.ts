import { check } from 'express-validator';
import { BASIC_STRING_RULE } from 'api/validators/common';
import { CAKE_SHAPE, SPONGE_COLOUR } from 'constants/order';

const orderRules = {
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
      .optional({ nullable: true })
      .custom((_, { req }) => {
        if (req.files && req.files.image.mimetype.startsWith('image')) {
          return true;
        }
        return false;
      })
      .withMessage('Nieprawidłowy rodzaj pliku'),
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

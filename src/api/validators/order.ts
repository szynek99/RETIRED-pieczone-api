import { check } from 'express-validator';
import { CAKE_SHAPE, ORDER_STATUS, SPONGE_COLOUR } from 'constants/order';

const orderRules = {
  addSingle: [
    check('firstname').isString().withMessage('Nieprawidłowa wartość'),
    check('surname').isString().withMessage('Nieprawidłowa wartość'),
    check('status')
      .custom((value) => {
        if (!ORDER_STATUS.includes(value)) {
          throw new Error('Nieprawidłowa wartość');
        }
        return true;
      })
      .withMessage('Nieprawidłowa wartość'),
    check('phoneNumber').isMobilePhone('pl-PL').withMessage('Nieprawidłowa wartość'),
    check('occasion').isString().optional({ nullable: true }).withMessage('Nieprawidłowa wartość'),
    check('cakeType').isString().withMessage('Nieprawidłowa wartość'),
    check('cakeFlavour').isString().withMessage('Nieprawidłowa wartość'),
    check('spongeColour')
      .custom((value) => {
        if (!SPONGE_COLOUR.includes(value)) {
          throw new Error('Nieprawidłowa wartość');
        }
        return true;
      })
      .withMessage('Nieprawidłowa wartość'),
    check('cakeWeight').isFloat({ min: 0 }).withMessage('Nieprawidłowa wartość'),
    check('cakeShape')
      .custom((value) => {
        if (!CAKE_SHAPE.includes(value)) {
          throw new Error('Nieprawidłowa wartość');
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
  ],
  getSingle: [
    check('hash').isString().isLength({ min: 5, max: 5 }).withMessage('Nieprawidłowa wartość'),
  ],
};

export default orderRules;

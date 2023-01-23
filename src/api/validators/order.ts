import { check } from 'express-validator';

const orderRules = {
  addSingle: [
    check('firstName').isString().withMessage('Invalid first name format'),
    check('secondName').isString().withMessage('Invalid second name format'),
  ],
  getSingle: [
    check('hash').isString().isLength({ min: 5, max: 5 }).withMessage('Invalid hash format'),
  ],
};

export default orderRules;

import { check } from 'express-validator';

const orderRules = {
  addSingle: [
    check('firstName').isString().withMessage('Invalid first name format'),
    check('secondName').isString().withMessage('Invalid second name format'),
  ],
};

export default orderRules;

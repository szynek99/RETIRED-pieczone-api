import { isArray, isString } from 'lodash';
import { check, param, query } from 'express-validator';
import { GET_ATTRIBUTES, ORDER_STATUS } from 'constants/order';
import { ARRAY_BELONING_RULE, GET_ALL_RULES } from 'api/validators/common';
import { ID_RULE, PRIMARY_VALIDATION } from './constants';

const orderRules = {
  getAll: [
    ...GET_ALL_RULES(GET_ATTRIBUTES),
    query('search').isString().optional({ nullable: true }).withMessage('Nieprawidłowa wartość'),
    query('cakeWeight')
      .isNumeric()
      .optional({ nullable: true })
      .withMessage('Nieprawidłowa wartość'),
    query('createdAt').isString().optional({ nullable: true }).withMessage('Nieprawidłowa wartość'),
    query('status').isString().optional({ nullable: true }).withMessage('Nieprawidłowa wartość'),
    query('firstname').isString().optional({ nullable: true }).withMessage('Nieprawidłowa wartość'),
    query('surname').isString().optional({ nullable: true }).withMessage('Nieprawidłowa wartość'),
    query('pickupDate')
      .isString()
      .optional({ nullable: true })
      .withMessage('Nieprawidłowa wartość'),
  ],
  addSingle: [
    ...PRIMARY_VALIDATION,
    check('pickupDate')
      .isISO8601()
      .withMessage('Nieprawidłowa wartość')
      .bail()
      .custom((value) => {
        const todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0);
        if (todayDate > new Date(value)) {
          throw new Error();
        }
        return true;
      })
      .withMessage('Odbiór nie może być w przeszłości'),
  ],
  updateSingle: [
    ...PRIMARY_VALIDATION,
    ID_RULE,
    ARRAY_BELONING_RULE('status', ORDER_STATUS),
    check('pickupDate').isISO8601().withMessage('Nieprawidłowa wartość'),
  ],
  getSingle: [ID_RULE],
  getMany: [
    query('id')
      .exists()
      .withMessage('Nieprawidłowa wartość')
      .bail()
      .custom((value) => {
        if (isArray(value)) {
          if (
            !value.every((val: string) =>
              /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
                val,
              ),
            )
          ) {
            throw new Error();
          }
        } else if (!isString(value) || value.length !== 36) {
          throw new Error();
        }
        return true;
      })
      .withMessage('Nieprawidłowa wartość'),
  ],
  getSingleByHash: [
    param('hash')
      .isString()
      .withMessage('Nieprawidłowa wartość')
      .bail()
      .isLength({ min: 21, max: 21 })
      .withMessage('Nieprawidłowa wartość'),
  ],
};

export default orderRules;

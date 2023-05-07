import { isArray, isString } from 'lodash';
import { check } from 'express-validator';
import { PRIMARY_VALIDATION } from 'constants/common';
import { GET_ATTRIBUTES, ORDER_STATUS } from 'constants/order';
import { BASIC_STRING_RULE, GET_ALL_RULES } from 'api/validators/common';

const orderRules = {
  getAll: [
    ...GET_ALL_RULES(GET_ATTRIBUTES),
    check('search').isString().optional({ nullable: true }).withMessage('Nieprawidłowa wartość'),
    check('cakeWeight')
      .isNumeric()
      .optional({ nullable: true })
      .withMessage('Nieprawidłowa wartość'),
    check('createdAt').isString().optional({ nullable: true }).withMessage('Nieprawidłowa wartość'),
    check('status').isString().optional({ nullable: true }).withMessage('Nieprawidłowa wartość'),
    check('firstname').isString().optional({ nullable: true }).withMessage('Nieprawidłowa wartość'),
    check('surname').isString().optional({ nullable: true }).withMessage('Nieprawidłowa wartość'),
  ],
  addSingle: [
    ...PRIMARY_VALIDATION,
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
  updateSingle: [
    ...PRIMARY_VALIDATION,
    BASIC_STRING_RULE('id'),
    BASIC_STRING_RULE('status')
      .custom((value) => {
        if (!ORDER_STATUS.includes(value)) {
          throw new Error();
        }
        return true;
      })
      .withMessage('Nieprawidłowa wartość'),
  ],
  getSingle: [
    check('id')
      .isString()
      .matches(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/)
      .withMessage('Nieprawidłowa wartość'),
  ],
  getMany: [
    check('id')
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
    check('hash')
      .isString()
      .withMessage('Nieprawidłowa wartość')
      .bail()
      .isLength({ min: 21, max: 21 })
      .withMessage('Nieprawidłowa wartość'),
  ],
};

export default orderRules;

import { isArray, isString } from 'lodash';
import { ORDER_STATUS } from 'constants/order';
import { check, query } from 'express-validator';
import { PRIMARY_VALIDATION } from 'constants/common';
import { BASIC_STRING_RULE } from 'api/validators/common';

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
        if (
          [
            'firstname',
            'surname',
            'status',
            'id',
            'cakeWeight',
            'createdAt',
            'updatedAt',
            'hash',
          ].includes(value)
        ) {
          return true;
        }
        return false;
      })
      .withMessage('Nieprawidłowa wartość'),
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
    check('id').isString().isLength({ max: 36, min: 36 }).withMessage('Nieprawidłowa wartość'),
  ],
  getMany: [
    check('id')
      .exists()
      .withMessage('Nieprawidłowa wartość')
      .bail()
      .custom((value) => {
        if (isArray(value)) {
          if (!value.every((val: string) => val.length === 36)) {
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

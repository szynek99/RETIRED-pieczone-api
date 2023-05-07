import { isArray } from 'lodash';
import { UploadedFile } from 'express-fileupload';
import { check, param, query } from 'express-validator';
import { GET_ATTRIBUTES, OFFER_CATEGORIES } from 'constants/offer';
import { ARRAY_BELONING_RULE, BASIC_STRING_RULE, GET_ALL_RULES } from 'api/validators/common';

const offerRules = {
  getSingle: [param('id').isNumeric().withMessage('Nieprawidłowa wartość')],
  getAll: [
    ...GET_ALL_RULES(GET_ATTRIBUTES),
    query('category')
      .isString()
      .optional({ nullable: true })
      .withMessage('Nieprawidłowa wartość')
      .custom((value) => {
        if (value && !OFFER_CATEGORIES.includes(value)) {
          throw new Error();
        }
        return true;
      })
      .withMessage('Nieprawidłowa wartość'),
  ],
  addSingle: [
    BASIC_STRING_RULE('title'),
    check('placement').isNumeric().withMessage('Nieprawidłowa wartość'),
    check('visible').isBoolean().withMessage('Nieprawidłowa wartość'),
    ARRAY_BELONING_RULE('category', OFFER_CATEGORIES),
    check('description')
      .isString()
      .optional({ nullable: true })
      .withMessage('Nieprawidłowa wartość'),
    check('images')
      .custom((_, { req: { files } }) => {
        if (files && files.images) {
          let { images } = files;
          if (!isArray(images)) {
            images = [images];
          }
          return images.every((image: UploadedFile) => image.mimetype.startsWith('image'));
        }
        return true;
      })
      .withMessage('Dozwolonych jest maksymalnie 5 plików graficznych')
      .bail()
      .custom((_, { req: { files } }) => {
        if (files && files.images) {
          let { images } = files;
          if (!isArray(images)) {
            images = [images];
          }
          return images.every((image: UploadedFile) => image.size < 5000000);
        }
        return true;
      })
      .withMessage('Zdjęcia za duże, maksymalny rozmiar to 5MB'),
  ],
  updateSingle: [
    param('id').isNumeric().withMessage('Nieprawidłowa wartość'),
    BASIC_STRING_RULE('title'),
    check('placement').isNumeric().withMessage('Nieprawidłowa wartość'),
    BASIC_STRING_RULE('visible'),
    ARRAY_BELONING_RULE('category', OFFER_CATEGORIES),
    check('description')
      .isString()
      .optional({ nullable: true })
      .withMessage('Nieprawidłowa wartość'),
    check('images')
      .custom((_, { req }) => {
        const { files } = req;
        if (files && files.images) {
          let { images } = files;
          if (!isArray(images)) {
            images = [images];
          }
          return images.every((image: UploadedFile) => image.mimetype.startsWith('image'));
        }
        return true;
      })
      .withMessage('Dozwolonych jest maksymalnie 5 plików graficznych')
      .bail()
      .custom((_, { req: { files } }) => {
        if (files && files.images) {
          let { images } = files;
          if (!isArray(images)) {
            images = [images];
          }
          return images.every((image: UploadedFile) => image.size < 5000000);
        }
        return true;
      })
      .withMessage('Zdjęcia za duże, maksymalny rozmiar to 5MB'),
  ],
};

export default offerRules;

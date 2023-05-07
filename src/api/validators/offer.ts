import { isArray } from 'lodash';
import { check } from 'express-validator';
import { UploadedFile } from 'express-fileupload';
import { OFFER_CATEGORIES } from 'constants/offer';
import { BASIC_STRING_RULE } from 'api/validators/common';

const offerRules = {
  addSingle: [
    BASIC_STRING_RULE('title'),
    BASIC_STRING_RULE('placement'),
    BASIC_STRING_RULE('visible'),
    BASIC_STRING_RULE('category')
      .custom((value) => {
        if (!OFFER_CATEGORIES.includes(value)) {
          throw new Error();
        }
        return true;
      })
      .withMessage('Nieprawidłowa wartość'),
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
      .withMessage('Dozwolony jest maksymalnie 5 plików graficznych')
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

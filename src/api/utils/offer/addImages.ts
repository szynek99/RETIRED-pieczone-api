import { nanoid } from 'nanoid';
import * as dotenv from 'dotenv';
import fileUpload from 'express-fileupload';

dotenv.config();

export default (newImages: fileUpload.UploadedFile[], payload: any) => {
  if (!payload.images) {
    // eslint-disable-next-line no-param-reassign
    payload.images = [];
  }
  newImages.forEach((newImage) => {
    const hash = nanoid();
    newImage.mv(`offer/${hash}.jpg`);
    payload.images.push(hash);
  });
};

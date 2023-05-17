import { nanoid } from 'nanoid';
import * as dotenv from 'dotenv';
import fileUpload from 'express-fileupload';

dotenv.config();

export default (newImages: fileUpload.UploadedFile[], payload: any) => {
  const newPayload = { ...payload };
  newImages.forEach((newImage) => {
    const hash = nanoid();
    newImage.mv(`offer/${hash}.jpg`);
    newPayload.images.push(hash);
  });
  return newPayload;
};

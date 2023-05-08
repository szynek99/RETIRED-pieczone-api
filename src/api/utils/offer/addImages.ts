import { nanoid } from 'nanoid';
import * as dotenv from 'dotenv';
import fileUpload from 'express-fileupload';

dotenv.config();

export default (newImages: fileUpload.UploadedFile[], imagesProperty: string[]) => {
  newImages.forEach((newImage) => {
    const hash = nanoid();
    newImage.mv(`offer/${hash}.jpg`);
    imagesProperty.push(hash);
  });
};

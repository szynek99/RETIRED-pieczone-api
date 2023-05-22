import * as dotenv from 'dotenv';
import fileUpload from 'express-fileupload';

dotenv.config();

export default (newImage: fileUpload.UploadedFile, hash: string) =>
  newImage.mv(`uploads/${hash}.jpg`);

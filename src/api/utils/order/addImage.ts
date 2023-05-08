import * as dotenv from 'dotenv';
import fileUpload from 'express-fileupload';

dotenv.config();

export default (newImage: fileUpload.UploadedFile, payload: any) => {
  newImage.mv(`uploads/${payload.hash}.jpg`);
  // eslint-disable-next-line no-param-reassign
  payload.imageAttached = true;
};

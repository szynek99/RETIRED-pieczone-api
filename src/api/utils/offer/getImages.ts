import { isArray } from 'lodash';
import fileUpload from 'express-fileupload';

export default (images: fileUpload.UploadedFile | fileUpload.UploadedFile[] | undefined) => {
  let result;
  if (images && !isArray(images)) {
    result = [images];
  } else {
    result = images;
  }
  return result;
};

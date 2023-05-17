import * as dotenv from 'dotenv';
import { ROUTES } from 'constants/routes';

dotenv.config();
const { API_URL } = process.env;

export default (formData: any) => {
  if (formData.imageAttached) {
    // eslint-disable-next-line no-param-reassign
    formData.image = {
      title: formData.hash,
      src: `${API_URL}${ROUTES.UPLOADS.ORDER}/${formData.hash}.jpg`,
    };
  } else {
    // eslint-disable-next-line no-param-reassign
    formData.image = null;
  }
  // eslint-disable-next-line no-param-reassign
  delete formData.imageAttached;
};

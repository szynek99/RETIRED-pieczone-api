import * as dotenv from 'dotenv';
import { ROUTES } from 'constants/routes';

dotenv.config();
const { API_URL } = process.env;

export default (formData: any) => ({
  ...formData,
  image: formData.imageAttached
    ? {
        title: formData.hash,
        src: `${API_URL}${ROUTES.UPLOADS.ORDER}/${formData.hash}.jpg`,
      }
    : undefined,
});

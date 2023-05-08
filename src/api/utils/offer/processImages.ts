import * as dotenv from 'dotenv';
import { ROUTES } from 'constants/routes';

dotenv.config();
const { API_URL } = process.env;

export default (formData: any) => ({
  ...formData,
  images: formData.images.map((imageHash: string) => ({
    title: imageHash,
    src: `${API_URL}${ROUTES.UPLOADS.OFFER}/${imageHash}.jpg`,
  })),
});

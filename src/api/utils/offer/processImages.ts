import * as dotenv from 'dotenv';
import { ROUTES } from 'constants/routes';

dotenv.config();
const { API_URL } = process.env;

export default (payload: any) => {
  const newPayload = { ...payload };
  newPayload.images = (payload.images || []).map((imageHash: string) => ({
    title: imageHash,
    src: `${API_URL}${ROUTES.UPLOADS.OFFER}/${imageHash}.jpg`,
  }));
  return newPayload;
};

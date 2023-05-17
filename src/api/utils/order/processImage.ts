import * as dotenv from 'dotenv';
import { ROUTES } from 'constants/routes';

dotenv.config();
const { API_URL } = process.env;

export default (payload: any) => {
  const newPayload = { ...payload };
  if (payload.imageAttached) {
    // eslint-disable-next-line no-param-reassign
    newPayload.image = {
      title: payload.hash,
      src: `${API_URL}${ROUTES.UPLOADS.ORDER}/${payload.hash}.jpg`,
    };
  } else {
    // eslint-disable-next-line no-param-reassign
    newPayload.image = null;
  }
  // eslint-disable-next-line no-param-reassign
  delete newPayload.imageAttached;
  return newPayload;
};

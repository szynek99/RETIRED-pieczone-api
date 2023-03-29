import { nanoid } from 'nanoid';
import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import { OrderInput } from 'db/models/order';
import { matchedData } from 'express-validator';
import { serverError } from 'api/utils/Response';
import { UploadedFile } from 'express-fileupload';
import { HttpStatusCode } from 'constants/common';
import { getOrderByHash, addOrder } from 'db/services/order';
import { ROUTES } from 'constants/routes';

dotenv.config();
const { API_URL } = process.env;

const postOrder = async (req: Request, res: Response) => {
  try {
    const hash = nanoid();
    const payload = matchedData(req) as OrderInput;
    const image = req.files?.image as UploadedFile | undefined;
    payload.hash = hash;

    if (image) {
      image.mv(`/uploads/${hash}.jpg`);
      payload.imageUrl = `${API_URL}${ROUTES.IMAGES}/${hash}.jpg`;
    }

    const result = await addOrder({ ...payload, hash });

    return res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER)
      .json(serverError(HttpStatusCode.INTERNAL_SERVER));
  }
};

const getOrder = async (req: Request, res: Response) => {
  try {
    const { hash } = req.params;
    const result = await getOrderByHash(hash);
    return res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER)
      .json(serverError(HttpStatusCode.INTERNAL_SERVER));
  }
};
export default { getOrder, postOrder };

import { nanoid } from 'nanoid';
import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import { OrderInput } from 'db/models/order';
import { matchedData } from 'express-validator';
import { UploadedFile } from 'express-fileupload';
import { requestError } from 'api/utils/Response';
import { HttpStatusCode } from 'constants/common';
import * as orderControler from 'api/services/order';

dotenv.config();
const { API_URL } = process.env;

const addOrder = async (req: Request, res: Response) => {
  try {
    const hash = nanoid();
    const payload = matchedData(req) as OrderInput;
    const image = req.files?.image as UploadedFile | undefined;
    payload.hash = hash;

    if (image) {
      image.mv(`/uploads/${hash}.jpg`);
      payload.imageUrl = `${API_URL}images/${hash}.jpg`;
    }

    const result = await orderControler.addOrder({ ...payload, hash });

    return res.status(HttpStatusCode.OK).send(result);
  } catch (error) {
    return res.status(HttpStatusCode.BAD_REQUEST).send(requestError(HttpStatusCode.BAD_REQUEST));
  }
};

const getOrder = async (req: Request, res: Response) => {
  try {
    const { hash } = req.params;
    const result = await orderControler.getByHash(hash);
    return res.status(HttpStatusCode.OK).send(result);
  } catch (error) {
    return res.status(HttpStatusCode.BAD_REQUEST).send(requestError(HttpStatusCode.BAD_REQUEST));
  }
};
export default { getOrder, addOrder };

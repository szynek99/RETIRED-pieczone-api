import { nanoid } from 'nanoid';
import * as dotenv from 'dotenv';
import { QueryParams } from 'types/order';
import { ROUTES } from 'constants/routes';
import { Request, Response } from 'express';
import { OrderInput } from 'db/models/order';
import queryParams from 'api/utils/queryParams';
import { matchedData } from 'express-validator';
import { serverError } from 'api/utils/Response';
import { UploadedFile } from 'express-fileupload';
import { HttpStatusCode } from 'constants/common';
import { addOrder, getAllOrders, getOrderById } from 'db/services/order';

dotenv.config();
const { API_URL } = process.env;

const postOrder = async (req: Request, res: Response) => {
  try {
    const hash = nanoid();
    const payload = matchedData(req) as OrderInput;
    const image = req.files?.image as UploadedFile | undefined;
    payload.hash = hash;

    if (image) {
      image.mv(`uploads/${hash}.jpg`);
      payload.imageUrl = `${API_URL}${ROUTES.UPLOADS.ORDER}/${hash}.jpg`;
    }
    console.debug(payload);
    const result = await addOrder({ ...payload, hash });

    return res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    return res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError());
  }
};

const getOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await getOrderById(id);

    return res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    return res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError());
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const params = queryParams<QueryParams>(matchedData(req));
    const { rows, count } = await getAllOrders(params);

    res.append('Access-Control-Expose-Headers', 'Content-Count');
    res.append('Content-Count', count.toString());

    res.status(HttpStatusCode.OK).json(rows);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError());
  }
};

export default { getOrder, postOrder, getOrders };

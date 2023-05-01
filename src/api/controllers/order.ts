import {
  addOrder,
  getAllOrders,
  getOrderById,
  getOrdersByIds,
  removeOrder,
  updateOrder,
  getOrderByHash,
} from 'db/services/order';
import { nanoid } from 'nanoid';
import * as dotenv from 'dotenv';
import { ROUTES } from 'constants/routes';
import { isNull, isString } from 'lodash';
import { Request, Response } from 'express';
import { OrderInput } from 'db/models/order';
import queryParams from 'api/utils/queryParams';
import { matchedData } from 'express-validator';
import { UploadedFile } from 'express-fileupload';
import { HttpStatusCode } from 'constants/common';
import removeOrderImage from 'api/utils/removeOrderImage';
import { QueryParams, UpdateOrderProps } from 'types/order';
import { requestError, serverError } from 'api/utils/Response';

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

    const result = await addOrder({ ...payload, hash });
    return res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    return res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError());
  }
};

const putOrder = async (req: Request, res: Response) => {
  try {
    const { id, ...rest } = matchedData(req, { includeOptionals: true });

    const result = (await updateOrder(id, rest as UpdateOrderProps))[1].pop();

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

const getOrderPublic = async (req: Request, res: Response) => {
  try {
    const { hash } = req.params;
    const result = await getOrderByHash(hash);

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

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = matchedData(req);
    const order = await getOrderById(id);

    if (isNull(order)) {
      res
        .status(HttpStatusCode.NOT_FOUND)
        .json(requestError(HttpStatusCode.NOT_FOUND, 'Nie znaleziono'));
      return;
    }
    removeOrderImage(order.hash);
    await removeOrder(id);
    res.status(HttpStatusCode.OK).json(order);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError());
  }
};

const deleteOrders = async (req: Request, res: Response) => {
  try {
    let { id } = matchedData(req);
    if (isString(id)) {
      id = [id];
    }
    const orders = await getOrdersByIds(id);

    if (isNull(orders) || id.length !== orders.length) {
      res
        .status(HttpStatusCode.NOT_FOUND)
        .json(requestError(HttpStatusCode.NOT_FOUND, 'Nie znaleziono'));
      return;
    }
    orders.forEach(({ hash }) => removeOrderImage(hash));
    await removeOrder(id);
    res.status(HttpStatusCode.OK).json(orders);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError());
  }
};

export default {
  getOrder,
  postOrder,
  getOrders,
  putOrder,
  deleteOrder,
  deleteOrders,
  getOrderPublic,
};

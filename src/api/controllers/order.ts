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
import { isNull, isString } from 'lodash';
import { Request, Response } from 'express';
import { OrderInput } from 'db/models/order';
import queryParams from 'api/utils/queryParams';
import addImage from 'api/utils/order/addImage';
import { matchedData } from 'express-validator';
import { UploadedFile } from 'express-fileupload';
import { HttpStatusCode } from 'constants/common';
import { PUBLIC_GET_ATTRIBUTES } from 'constants/order';
import processImage from 'api/utils/order/processImage';
import removeOrderImage from 'api/utils/order/removeImage';
import { QueryParams, UpdateOrderProps } from 'types/order';
import { requestError, serverError } from 'api/utils/Response';

const postOrder = async (req: Request, res: Response) => {
  try {
    const hash = nanoid();
    const payload = matchedData(req);
    const newImage = req.files?.image as UploadedFile | undefined;
    payload.pickupDate = new Date(payload.pickupDate);
    payload.hash = hash;

    if (req.clearFlavour) {
      payload.cakeFlavour = undefined;
    }

    if (newImage) {
      addImage(newImage, hash);
      payload.imageAttached = true;
    }

    let order = (await addOrder(payload as OrderInput)).dataValues;
    order = processImage(order);

    res.status(HttpStatusCode.OK).json(order);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError());
  }
};

const putOrder = async (req: Request, res: Response) => {
  try {
    const { id, ...payload } = matchedData(req, { includeOptionals: true });
    const newImage = req.files?.image as UploadedFile | undefined;
    payload.pickupDate = new Date(payload.pickupDate);

    if (req.clearFlavour) {
      payload.cakeFlavour = undefined;
    }

    if (!payload.image) {
      await removeOrderImage(req.hash);
      payload.imageAttached = false;
    }

    if (newImage) {
      addImage(newImage, req.hash);
      payload.imageAttached = true;
    }

    let order = (await updateOrder(id, payload as UpdateOrderProps))[1][0].dataValues;
    order = processImage(order);

    res.status(HttpStatusCode.OK).json(order);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError());
  }
};

const getOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let order = await getOrderById(id);

    if (isNull(order)) {
      res.status(HttpStatusCode.NOT_FOUND).json(requestError('Nie znaleziono'));
      return;
    }

    order = processImage(order);

    res.status(HttpStatusCode.OK).json(order);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError());
  }
};

const getOrderPublic = async (req: Request, res: Response) => {
  try {
    const { hash } = req.params;
    const order = await getOrderByHash(hash, PUBLIC_GET_ATTRIBUTES);

    if (isNull(order)) {
      res.status(HttpStatusCode.NOT_FOUND).json(requestError('Nie znaleziono'));
      return;
    }

    res.status(HttpStatusCode.OK).json(order);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError());
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const params = queryParams<QueryParams>(matchedData(req));
    const { rows: orders, count } = await getAllOrders(params);

    res.append('Access-Control-Expose-Headers', 'Content-Count');
    res.append('Content-Count', count.toString());

    res.status(HttpStatusCode.OK).json(orders);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError());
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = matchedData(req);

    if (req.imageAttached) {
      removeOrderImage(req.hash);
    }

    await removeOrder(id);
    res.status(HttpStatusCode.OK).json();
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
      res.status(HttpStatusCode.NOT_FOUND).json(requestError('Nie znaleziono'));
      return;
    }

    orders.forEach(({ imageAttached, hash }) => imageAttached && removeOrderImage(hash));
    await removeOrder(id);

    res.status(HttpStatusCode.OK).json();
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

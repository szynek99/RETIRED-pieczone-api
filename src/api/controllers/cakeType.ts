import {
  addCakeType,
  getAllCakeTypes,
  getCakeType,
  removeCakeType,
  updateCakeType,
} from 'db/services/cakeType';
import * as dotenv from 'dotenv';
import isNull from 'lodash/isNull';
import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { HttpStatusCode } from 'constants/common';
import { AddTypeInput, UpdateTypeProps } from 'types/cakeType';
import { serverError, requestError } from 'api/utils/Response';

dotenv.config();

const postType = async (req: Request, res: Response) => {
  try {
    const properties = matchedData(req) as AddTypeInput;

    const result = await addCakeType(properties);
    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError(HttpStatusCode.INTERNAL_SERVER));
  }
};

const putType = async (req: Request, res: Response) => {
  try {
    const { id, ...rest } = matchedData(req);

    const cakeType = await getCakeType(id);
    if (isNull(cakeType)) {
      res
        .status(HttpStatusCode.NOT_FOUND)
        .json(requestError(HttpStatusCode.NOT_FOUND, 'Nie znaleziono'));
      return;
    }
    const result = (await updateCakeType(id, rest as UpdateTypeProps))[1].pop();

    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError(HttpStatusCode.INTERNAL_SERVER));
  }
};

const getType = async (req: Request, res: Response) => {
  try {
    const { id } = matchedData(req);
    const result = await getCakeType(id);

    if (isNull(result)) {
      res
        .status(HttpStatusCode.NOT_FOUND)
        .json(requestError(HttpStatusCode.NOT_FOUND, 'Nie znaleziono'));
      return;
    }
    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError(HttpStatusCode.INTERNAL_SERVER));
  }
};

const getAllTypes = async (_: Request, res: Response) => {
  try {
    const result = await getAllCakeTypes();
    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError(HttpStatusCode.INTERNAL_SERVER));
  }
};

const deleteType = async (req: Request, res: Response) => {
  try {
    const { id } = matchedData(req);
    const cakeType = await getCakeType(id);

    if (isNull(cakeType)) {
      res
        .status(HttpStatusCode.NOT_FOUND)
        .json(requestError(HttpStatusCode.NOT_FOUND, 'Nie znaleziono'));
      return;
    }
    await removeCakeType(id);
    res.status(HttpStatusCode.OK).json(cakeType);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError(HttpStatusCode.INTERNAL_SERVER));
  }
};

export default { postType, getType, getAllTypes, deleteType, putType };

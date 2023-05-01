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
import queryParams from 'api/utils/queryParams';
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
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError());
  }
};

const putType = async (req: Request, res: Response) => {
  try {
    const { id, ...rest } = matchedData(req, { includeOptionals: true });

    const cakeType = await getCakeType(id);
    if (isNull(cakeType)) {
      res.status(HttpStatusCode.NOT_FOUND).json(requestError('Nie znaleziono'));
      return;
    }
    const result = (await updateCakeType(id, rest as UpdateTypeProps))[1].pop();

    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError());
  }
};

const getType = async (req: Request, res: Response) => {
  try {
    const { id } = matchedData(req);
    const result = await getCakeType(id);

    if (isNull(result)) {
      res.status(HttpStatusCode.NOT_FOUND).json(requestError('Nie znaleziono'));
      return;
    }
    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError());
  }
};

const getAllTypes = async (req: Request, res: Response) => {
  try {
    const params = queryParams(matchedData(req));
    const { rows, count } = await getAllCakeTypes(params);

    res.append('Access-Control-Expose-Headers', 'Content-Count');
    res.append('Content-Count', count.toString());

    res.status(HttpStatusCode.OK).json(rows);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError());
  }
};

const deleteType = async (req: Request, res: Response) => {
  try {
    const { id } = matchedData(req);
    const cakeType = await getCakeType(id);

    if (isNull(cakeType)) {
      res.status(HttpStatusCode.NOT_FOUND).json(requestError('Nie znaleziono'));
      return;
    }
    await removeCakeType(id);
    res.status(HttpStatusCode.OK).json(cakeType);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError());
  }
};

export default { postType, getType, getAllTypes, deleteType, putType };

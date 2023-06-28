import {
  addCakeType,
  getAllCakeTypes,
  getAllCakeTypesPublic,
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

    const cakeType = await addCakeType(properties);

    res.status(HttpStatusCode.OK).json(cakeType);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError());
  }
};

const putType = async (req: Request, res: Response) => {
  try {
    const { id, ...props } = matchedData(req, { includeOptionals: true });

    const cakeType = (await updateCakeType(id, props as UpdateTypeProps))[1].pop();

    res.status(HttpStatusCode.OK).json(cakeType);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError());
  }
};

const getType = async (req: Request, res: Response) => {
  try {
    const { id } = matchedData(req);
    const cakeType = await getCakeType(id);

    if (isNull(cakeType)) {
      res.status(HttpStatusCode.NOT_FOUND).json(requestError('Nie znaleziono'));
      return;
    }
    res.status(HttpStatusCode.OK).json(cakeType);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError());
  }
};

const getAllTypes = async (req: Request, res: Response) => {
  try {
    const params = queryParams(matchedData(req));
    const { rows: cakeTypes, count } = await getAllCakeTypes(params);

    res.append('Access-Control-Expose-Headers', 'Content-Count');
    res.append('Content-Count', count.toString());

    res.status(HttpStatusCode.OK).json(cakeTypes);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError());
  }
};

const getAllTypesPublic = async (_: Request, res: Response) => {
  try {
    const cakeTypes = await getAllCakeTypesPublic();

    res.status(HttpStatusCode.OK).json(cakeTypes);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError());
  }
};

const deleteType = async (req: Request, res: Response) => {
  try {
    const { id } = matchedData(req);

    await removeCakeType(id);

    res.status(HttpStatusCode.OK).json();
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError());
  }
};

export default { postType, getType, getAllTypes, deleteType, putType, getAllTypesPublic };

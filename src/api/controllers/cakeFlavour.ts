import {
  addCakeFlavour,
  getCakeFlavour,
  updateCakeFlavour,
  getAllCakeFlavours,
  removeCakeFlavour,
} from 'db/services/cakeFlavour';
import * as dotenv from 'dotenv';
import isNull from 'lodash/isNull';
import { Request, Response } from 'express';
import queryParams from 'api/utils/queryParams';
import { matchedData } from 'express-validator';
import { HttpStatusCode } from 'constants/common';
import { serverError, requestError } from 'api/utils/Response';
import { AddFlavourInput, UpdateFlavourProps } from 'types/cakeFlavour';

dotenv.config();

const postFlavour = async (req: Request, res: Response) => {
  try {
    const properties = matchedData(req) as AddFlavourInput;

    const result = await addCakeFlavour(properties);
    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError(HttpStatusCode.INTERNAL_SERVER));
  }
};

const putFlavour = async (req: Request, res: Response) => {
  try {
    const { id, ...rest } = matchedData(req);

    const cakeFlavour = await getCakeFlavour(id);
    if (isNull(cakeFlavour)) {
      res
        .status(HttpStatusCode.NOT_FOUND)
        .json(requestError(HttpStatusCode.NOT_FOUND, 'Nie znaleziono'));
      return;
    }
    const result = (await updateCakeFlavour(id, rest as UpdateFlavourProps))[1].pop();

    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError(HttpStatusCode.INTERNAL_SERVER));
  }
};

const getFlavour = async (req: Request, res: Response) => {
  try {
    const { id } = matchedData(req);
    const result = await getCakeFlavour(id);

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

const getAllFlavours = async (req: Request, res: Response) => {
  try {
    const params = queryParams(matchedData(req));
    const { rows, count } = await getAllCakeFlavours(params);

    res.append('Access-Control-Expose-Headers', 'Content-Count');
    res.append('Content-Count', count.toString());

    res.status(HttpStatusCode.OK).json(rows);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError(HttpStatusCode.INTERNAL_SERVER));
  }
};

const deleteFlavour = async (req: Request, res: Response) => {
  try {
    const { id } = matchedData(req);
    const cakeFlavour = await getCakeFlavour(id);

    if (isNull(cakeFlavour)) {
      res
        .status(HttpStatusCode.NOT_FOUND)
        .json(requestError(HttpStatusCode.NOT_FOUND, 'Nie znaleziono'));
      return;
    }
    await removeCakeFlavour(id);
    res.status(HttpStatusCode.OK).json(cakeFlavour);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError(HttpStatusCode.INTERNAL_SERVER));
  }
};

export default { postFlavour, getFlavour, getAllFlavours, deleteFlavour, putFlavour };

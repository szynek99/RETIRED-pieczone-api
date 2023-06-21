import {
  addCakeFlavour,
  getCakeFlavour,
  updateCakeFlavour,
  getAllCakeFlavours,
  removeCakeFlavour,
  getAllCakeFlavoursPublic,
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

    const cakeFlavour = await addCakeFlavour(properties);

    res.status(HttpStatusCode.OK).json(cakeFlavour);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError());
  }
};

const putFlavour = async (req: Request, res: Response) => {
  try {
    const { id, ...props } = matchedData(req);

    const cakeFlavour = (await updateCakeFlavour(id, props as UpdateFlavourProps))[1].pop();

    res.status(HttpStatusCode.OK).json(cakeFlavour);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError());
  }
};

const getFlavour = async (req: Request, res: Response) => {
  try {
    const { id } = matchedData(req);
    const cakeFlavour = await getCakeFlavour(id);

    if (isNull(cakeFlavour)) {
      res.status(HttpStatusCode.NOT_FOUND).json(requestError('Nie znaleziono'));
      return;
    }
    res.status(HttpStatusCode.OK).json(cakeFlavour);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError());
  }
};

const getAllFlavours = async (req: Request, res: Response) => {
  try {
    const params = queryParams(matchedData(req));
    const { rows: cakeFlavours, count } = await getAllCakeFlavours(params);

    res.append('Access-Control-Expose-Headers', 'Content-Count');
    res.append('Content-Count', count.toString());

    res.status(HttpStatusCode.OK).json(cakeFlavours);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError());
  }
};

const getAllFlavoursPublic = async (req: Request, res: Response) => {
  try {
    const cakeFlavours = await getAllCakeFlavoursPublic();

    res.status(HttpStatusCode.OK).json(cakeFlavours);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError());
  }
};

const deleteFlavour = async (req: Request, res: Response) => {
  try {
    const { id } = matchedData(req);

    await removeCakeFlavour(id);
    res.status(HttpStatusCode.OK).json();
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError());
  }
};

export default {
  postFlavour,
  getFlavour,
  getAllFlavours,
  deleteFlavour,
  putFlavour,
  getAllFlavoursPublic,
};

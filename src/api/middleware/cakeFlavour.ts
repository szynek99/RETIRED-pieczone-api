import isNull from 'lodash/isNull';
import { matchedData } from 'express-validator';
import { HttpStatusCode } from 'constants/common';
import { AddFlavourInput } from 'types/cakeFlavour';
import { NextFunction, Request, Response } from 'express';
import { requestError, singleFieldError } from 'api/utils/Response';
import { getCakeFlavour, getCakeFlavourByValue } from 'db/services/cakeFlavour';

export const checkDuplicateValue = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const attributes = matchedData(req) as AddFlavourInput;
  const cakeFlavour = await getCakeFlavourByValue(attributes.value);

  if (cakeFlavour) {
    res
      .status(HttpStatusCode.UNPROCESSABLE)
      .json(singleFieldError('value', 'Wartość jest już zajęta'));
    return;
  }
  next();
};

export const checkResourceExistance = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { id } = matchedData(req);
  const cakeFlavour = await getCakeFlavour(id);

  if (isNull(cakeFlavour)) {
    res.status(HttpStatusCode.NOT_FOUND).json(requestError('Nie znaleziono'));
    return;
  }
  next();
};

import { isNil } from 'lodash';
import isNull from 'lodash/isNull';
import { OrderInput } from 'db/models/order';
import { matchedData } from 'express-validator';
import { getOrderById } from 'db/services/order';
import { HttpStatusCode } from 'constants/common';
import { getCakeTypeByValue } from 'db/services/cakeType';
import { NextFunction, Request, Response } from 'express';
import { singleFieldError, requestError } from 'api/utils/Response';

export const checkValidFlavour = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { cakeType: cakeTypeValue, cakeFlavour: cakeFlavourValue } = matchedData(req) as OrderInput;
  const cakeType = await getCakeTypeByValue(cakeTypeValue);

  if (isNil(cakeType)) {
    res
      .status(HttpStatusCode.UNPROCESSABLE)
      .json(singleFieldError('cakeType', 'Nieprawidłowa wartość'));
    return;
  }

  if (cakeType.customizable && isNil(cakeFlavourValue)) {
    res.status(HttpStatusCode.UNPROCESSABLE).json(singleFieldError('cakeFlavour', 'Wymagany'));
    return;
  }

  next();
};

export const checkResourceExistance = async (req: Request, res: Response, next: NextFunction) => {
  const { id, hash, imageAttached } = matchedData(req);
  const order = await getOrderById(id);

  if (isNull(order)) {
    res.status(HttpStatusCode.NOT_FOUND).json(requestError('Nie znaleziono'));
    return;
  }
  req.hash = hash;
  req.imageAttached = imageAttached;

  next();
};

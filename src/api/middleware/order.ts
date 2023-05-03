import { isNil } from 'lodash';
import { OrderInput } from 'db/models/order';
import { matchedData } from 'express-validator';
import { HttpStatusCode } from 'constants/common';
import { singleFieldError } from 'api/utils/Response';
import { getCakeTypeByValue } from 'db/services/cakeType';
import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line import/prefer-default-export
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

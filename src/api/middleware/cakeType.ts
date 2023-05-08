import isNull from 'lodash/isNull';
import { AddTypeInput } from 'types/cakeType';
import { matchedData } from 'express-validator';
import { HttpStatusCode } from 'constants/common';
import { NextFunction, Request, Response } from 'express';
import { requestError, singleFieldError } from 'api/utils/Response';
import { getCakeType, getCakeTypeByValue } from 'db/services/cakeType';

export const checkDuplicateValue = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const attributes = matchedData(req) as AddTypeInput;
  const cakeType = await getCakeTypeByValue(attributes.value);

  if (cakeType) {
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
  const cakeType = await getCakeType(id);

  if (isNull(cakeType)) {
    res.status(HttpStatusCode.NOT_FOUND).json(requestError('Nie znaleziono'));
    return;
  }
  next();
};

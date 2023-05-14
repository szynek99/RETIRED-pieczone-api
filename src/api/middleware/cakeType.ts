import isNull from 'lodash/isNull';
import { AddTypeInput } from 'types/cakeType';
import { matchedData } from 'express-validator';
import { HttpStatusCode } from 'constants/common';
import { countByCakeType } from 'db/services/order';
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

export const checkResourceUsage = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { id } = matchedData(req);

  const cakeType = await getCakeType(id);
  console.debug(cakeType);
  const isFlavourUsed = await countByCakeType(cakeType!.value);

  if (isFlavourUsed !== 0) {
    res
      .status(HttpStatusCode.UNPROCESSABLE)
      .json(requestError('Wybrany rodzaj jest dalej używany'));
    return;
  }

  next();
};

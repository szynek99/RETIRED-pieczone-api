import { matchedData } from 'express-validator';
import { AddTypeInput } from 'types/cakeType';
import { HttpStatusCode } from 'constants/common';
import { singleFieldError } from 'api/utils/Response';
import { NextFunction, Request, Response } from 'express';
import { getCakeTypeByValue } from 'db/services/cakeType';

// eslint-disable-next-line import/prefer-default-export
export const checkDuplicateValue = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const attributes = matchedData(req) as AddTypeInput;
  const cakeType = await getCakeTypeByValue(attributes.value);

  if (cakeType) {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .json(singleFieldError('value', 'Wartość jest już zajęta'));
    return;
  }
  next();
};

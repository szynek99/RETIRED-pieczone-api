import { matchedData } from 'express-validator';
import { requestError } from 'api/utils/Response';
import { HttpStatusCode } from 'constants/common';
import { AddTypeInput } from 'types/cakeType';
import { getCakeTypeByValue } from 'db/services/cakeType';
import { NextFunction, Request, Response } from 'express';

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
      .json(requestError(HttpStatusCode.BAD_REQUEST, 'Wartość name jest już zajęta'));
    return;
  }
  next();
};

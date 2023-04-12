import { matchedData } from 'express-validator';
import { requestError } from 'api/utils/Response';
import { HttpStatusCode } from 'constants/common';
import { AddFlavourInput } from 'types/cakeFlavour';
import { NextFunction, Request, Response } from 'express';
import { getCakeFlavourByValue } from 'db/services/cakeFlavour';

// eslint-disable-next-line import/prefer-default-export
export const checkDuplicateValue = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const attributes = matchedData(req) as AddFlavourInput;
  const cakeFlavour = await getCakeFlavourByValue(attributes.value);

  if (cakeFlavour) {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .json(requestError(HttpStatusCode.BAD_REQUEST, 'Wartość name jest już zajęta'));
    return;
  }
  next();
};

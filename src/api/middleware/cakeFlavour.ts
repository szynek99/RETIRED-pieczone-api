import { matchedData } from 'express-validator';
import { HttpStatusCode } from 'constants/common';
import { AddFlavourInput } from 'types/cakeFlavour';
import { singleFieldError } from 'api/utils/Response';
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
      .status(HttpStatusCode.UNPROCESSABLE)
      .json(singleFieldError('value', 'Wartość jest już zajęta'));
    return;
  }
  next();
};

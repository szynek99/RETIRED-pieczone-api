/* eslint-disable import/prefer-default-export */
import * as dotenv from 'dotenv';
import { fieldsError } from 'api/utils/Response';
import { HttpStatusCode } from 'constants/common';
import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';

dotenv.config();

export const checkRequired = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res
      .status(HttpStatusCode.UNPROCESSABLE)
      .json(fieldsError(HttpStatusCode.UNPROCESSABLE, errors));
    return;
  }

  next();
};

/* eslint-disable import/prefer-default-export */
import * as dotenv from 'dotenv';
import { HttpStatusCode } from 'constants/common';
import { NextFunction, Request, Response } from 'express';
import { fieldsError } from 'api/utils/Response';
import { validationResult } from 'express-validator';

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

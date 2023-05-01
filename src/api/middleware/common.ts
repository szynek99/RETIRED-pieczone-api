import chalk from 'chalk';
import morgan from 'morgan';
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
    res.status(HttpStatusCode.UNPROCESSABLE).json(fieldsError(errors));
    return;
  }

  next();
};

export const requestLogger = morgan((tokens, req, res) =>
  [
    chalk.green.bold(tokens.method(req, res)),
    chalk.red.bold(tokens.status(req, res)),
    chalk.white(tokens.url(req, res)),
    chalk.blue(`@ ${tokens.date(req, res)}`),
    chalk.hex('#f7578e').bold(tokens['remote-addr'](req, res)),
    chalk.yellow(`${tokens['response-time'](req, res)} ms`),
  ].join(' '),
);

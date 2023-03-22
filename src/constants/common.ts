/* eslint-disable no-shadow */
import { check } from 'express-validator';

export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNPROCESSABLE = 422,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
}

export const BASIC_STRING_RULE = (name: string) =>
  check(name).isString().withMessage('Zły format').isLength({ min: 1 }).withMessage('Za krótkie');

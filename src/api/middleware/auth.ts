/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import { isArray } from 'lodash';
import * as dotenv from 'dotenv';
import { matchedData } from 'express-validator';
import { HttpStatusCode } from 'constants/common';
import { requestError } from 'api/utils/Response';
import { JwtPayload, SignupInput } from 'types/auth';
import { NextFunction, Request, Response } from 'express';
import { findUserById, findUserByUsername } from 'api/services/auth';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

export const checkDuplicateUsername = async (req: Request, res: Response, next: NextFunction) => {
  const credentials = matchedData(req) as SignupInput;
  const userExists = await findUserByUsername(credentials.username);

  if (userExists) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json(requestError(HttpStatusCode.BAD_REQUEST, 'user already exists'));
  }

  next();
};

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-access-token'];

  if (!token || isArray(token)) {
    return res
      .status(HttpStatusCode.FORBIDDEN)
      .json(requestError(HttpStatusCode.FORBIDDEN, 'token not provided'));
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json(requestError(HttpStatusCode.UNAUTHORIZED, 'unauthorized'));
    }
    const { id } = decoded as JwtPayload;
    req.userId = id;
    next();
  });
};

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  findUserById(req.userId!).then((user) => {
    if (user?.role !== 'admin') {
      res
        .status(HttpStatusCode.FORBIDDEN)
        .json(requestError(HttpStatusCode.UNAUTHORIZED, 'insufficient user role'));
    }
    next();
  });
};

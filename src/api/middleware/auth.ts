/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { isArray, isNull } from 'lodash';
import { matchedData } from 'express-validator';
import { requestError } from 'api/utils/Response';
import { HttpStatusCode } from 'constants/common';
import { JwtPayload, RegisterInput } from 'types/auth';
import { NextFunction, Request, Response } from 'express';
import { getUserById, getUserByUsername } from 'db/services/auth';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

export const checkDuplicateUsername = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const credentials = matchedData(req) as RegisterInput;
  const userExists = await getUserByUsername(credentials.username);

  if (userExists) {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .send(requestError(HttpStatusCode.BAD_REQUEST, 'user already exists'));
    return;
  }

  next();
};

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-access-token'];

  if (!token || isArray(token)) {
    return res
      .status(HttpStatusCode.FORBIDDEN)
      .send(requestError(HttpStatusCode.FORBIDDEN, 'token not provided'));
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .send(requestError(HttpStatusCode.UNAUTHORIZED, 'unauthorized'));
    }
    const { id } = decoded as JwtPayload;
    req.userId = id;
    next();
  });
};

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const user = await getUserById(req.userId!);
  if (isNull(user)) {
    res
      .status(HttpStatusCode.FORBIDDEN)
      .json(requestError(HttpStatusCode.UNAUTHORIZED, 'user does not exist'));
  }
  if (user!.role !== 'admin') {
    res
      .status(HttpStatusCode.FORBIDDEN)
      .json(requestError(HttpStatusCode.UNAUTHORIZED, 'insufficient user role'));
  }
  next();
};

export default { isAdmin, verifyToken, checkDuplicateUsername };

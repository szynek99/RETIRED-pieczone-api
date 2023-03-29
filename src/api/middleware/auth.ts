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
      .json(requestError(HttpStatusCode.BAD_REQUEST, 'Użytkownik już istnieje'));
    return;
  }

  next();
};

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-access-token'];

  if (!token || isArray(token)) {
    res
      .status(HttpStatusCode.FORBIDDEN)
      .json(requestError(HttpStatusCode.FORBIDDEN, 'Brak tokenu'));
    return;
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json(requestError(HttpStatusCode.UNAUTHORIZED, 'Niezautoryzowany'));
      return;
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
      .json(requestError(HttpStatusCode.UNAUTHORIZED, 'Użytkownik nie istnieje'));
    return;
  }
  if (user && user.role !== 'admin') {
    res
      .status(HttpStatusCode.FORBIDDEN)
      .json(requestError(HttpStatusCode.UNAUTHORIZED, 'Niewystarczające uprawnienia'));
    return;
  }
  next();
};

export default { isAdmin, verifyToken, checkDuplicateUsername };

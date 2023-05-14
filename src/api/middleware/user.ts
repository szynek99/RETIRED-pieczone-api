import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { isArray, isNull } from 'lodash';
import { matchedData } from 'express-validator';
import { HttpStatusCode } from 'constants/common';
import { JwtPayload, RegisterInput } from 'types/user';
import { NextFunction, Request, Response } from 'express';
import { getUserById, getUserByUsername } from 'db/services/user';
import { requestError, singleFieldError } from 'api/utils/Response';

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
      .status(HttpStatusCode.UNPROCESSABLE)
      .json(singleFieldError('username', 'Nazwa użytkownia jest już zajęta'));
    return;
  }

  next();
};

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-access-token'];

  if (!token || isArray(token)) {
    res.status(HttpStatusCode.FORBIDDEN).json(requestError('Brak tokenu'));
    return;
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(HttpStatusCode.UNAUTHORIZED).json(requestError('Niezautoryzowany'));
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
    res.status(HttpStatusCode.FORBIDDEN).json(requestError('Użytkownik nie istnieje'));
    return;
  }
  console.debug(user);
  if (user && user.role !== 'admin') {
    res.status(HttpStatusCode.FORBIDDEN).json(requestError('Niewystarczające uprawnienia'));
    return;
  }
  next();
};

export default { isAdmin, verifyToken, checkDuplicateUsername };

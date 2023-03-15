import bcrypt from 'bcryptjs';
import pick from 'lodash/pick';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { addUser, getUserByUsername } from 'db/services/auth';
import { Request, Response } from 'express';
import { HttpStatusCode } from 'constants/common';
import { LoginInput, RegisterInput } from 'types/auth';
import { JWT_LIFE, LOGIN_PROPS } from 'constants/auth';
import { matchedData, validationResult } from 'express-validator';
import { fieldsError, requestError, serverError } from 'api/utils/Response';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

export const register = async (req: Request, res: Response) => {
  try {
    const credentials = matchedData(req) as RegisterInput;

    await addUser({
      ...credentials,
      password: bcrypt.hashSync(credentials.password, 10),
    });
    res.status(HttpStatusCode.OK).send('user created successfully');
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).send(serverError(HttpStatusCode.INTERNAL_SERVER));
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const credentials = matchedData(req) as LoginInput;

    const user = await getUserByUsername(credentials.username);

    if (!user) {
      res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json(requestError(HttpStatusCode.UNAUTHORIZED, 'username or password did not match'));
      return;
    }
    const passwordIsValid = bcrypt.compareSync(credentials.password, user.password);

    if (!passwordIsValid) {
      res.status(HttpStatusCode.UNAUTHORIZED).send('username or password did not match');
      return;
    }
    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: JWT_LIFE,
    });
    const userData = pick(user, LOGIN_PROPS);

    res.status(HttpStatusCode.OK).send({ ...userData, token });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).send(serverError(HttpStatusCode.INTERNAL_SERVER));
  }
};

export default { login, register };

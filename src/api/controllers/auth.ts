import bcrypt from 'bcryptjs';
import pick from 'lodash/pick';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { addUser, getUserByUsername } from 'db/services/auth';
import { Request, Response } from 'express';
import { HttpStatusCode } from 'constants/common';
import { SigninInput, SignupInput } from 'types/auth';
import { JWT_LIFE, LOGIN_PROPS } from 'constants/auth';
import { matchedData, validationResult } from 'express-validator';
import { fieldsError, requestError, serverError } from 'api/utils/Response';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

export const SignUpController = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(HttpStatusCode.UNPROCESSABLE)
        .json(fieldsError(HttpStatusCode.UNPROCESSABLE, errors));
    }

    const credentials = matchedData(req) as SignupInput;

    await addUser({
      ...credentials,
      password: bcrypt.hashSync(credentials.password, 10),
    });
    return res.status(HttpStatusCode.OK).send('user created successfully');
  } catch (error) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER)
      .send(serverError(HttpStatusCode.INTERNAL_SERVER));
  }
};

export const SignInController = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(HttpStatusCode.UNPROCESSABLE)
        .json(fieldsError(HttpStatusCode.UNPROCESSABLE, errors));
    }
    const credentials = matchedData(req) as SigninInput;

    const user = await getUserByUsername(credentials.username);

    if (!user) {
      return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json(requestError(HttpStatusCode.UNAUTHORIZED, 'username or password did not match'));
    }
    const passwordIsValid = bcrypt.compareSync(credentials.password, user.password);

    if (!passwordIsValid) {
      return res.status(HttpStatusCode.UNAUTHORIZED).send('username or password did not match');
    }
    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: JWT_LIFE,
    });
    const userData = pick(user, LOGIN_PROPS);

    return res.status(HttpStatusCode.OK).send({ ...userData, token });
  } catch (error) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER)
      .send(serverError(HttpStatusCode.INTERNAL_SERVER));
  }
};

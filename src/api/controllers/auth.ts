import bcrypt from 'bcryptjs';
import pick from 'lodash/pick';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { HttpStatusCode } from 'constants/common';
import { LoginInput, RegisterInput } from 'types/auth';
import { JWT_LIFE, LOGIN_PROPS } from 'constants/auth';
import { addUser, getUserByUsername } from 'db/services/auth';
import { requestError, serverError } from 'api/utils/Response';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

const register = async (req: Request, res: Response) => {
  try {
    const credentials = matchedData(req) as RegisterInput;

    await addUser({
      ...credentials,
      password: bcrypt.hashSync(credentials.password, 10),
    });
    res.status(HttpStatusCode.OK).json('Użytkownik pomyślnie stworzony');
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError(HttpStatusCode.INTERNAL_SERVER));
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const credentials = matchedData(req) as LoginInput;

    const user = await getUserByUsername(credentials.username);

    if (!user) {
      res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json(requestError(HttpStatusCode.UNAUTHORIZED, 'Dane logowania błędne'));
      return;
    }
    const passwordIsValid = bcrypt.compareSync(credentials.password, user.password);

    if (!passwordIsValid) {
      res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json(requestError(HttpStatusCode.UNAUTHORIZED, 'Dane logowania błędne'));
      return;
    }
    const userData = pick(user, LOGIN_PROPS);
    const token = jwt.sign({ id: user.id, ...userData }, JWT_SECRET, {
      expiresIn: JWT_LIFE,
    });

    res.status(HttpStatusCode.OK).json({ token });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError(HttpStatusCode.INTERNAL_SERVER));
  }
};

export default { login, register };

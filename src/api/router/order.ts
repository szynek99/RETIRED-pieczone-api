import { matchedData } from 'express-validator';
import { Router, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { OrderInput } from 'db/models/order';
import orderRules from 'api/validators/order';
import * as orderControler from 'api/controllers/order';
import { NotFoundError } from 'api/utils/Error';
import { HttpStatusCode } from 'constants/common';
import { fieldsError, requestError } from 'api/utils/Response';

const orderRouter = Router();

orderRouter.post('/', orderRules.addSingle, async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(HttpStatusCode.UNPROCESSABLE)
        .json(fieldsError(HttpStatusCode.UNPROCESSABLE, errors));
    }

    const payload = matchedData(req) as OrderInput;
    const result = await orderControler.addOrder(payload);
    return res.status(HttpStatusCode.OK).send(result);
  } catch (error) {
    return res.status(HttpStatusCode.BAD_REQUEST).send(requestError(HttpStatusCode.BAD_REQUEST));
  }
});

orderRouter.get('/:hash', orderRules.getSingle, async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(HttpStatusCode.UNPROCESSABLE)
        .json(fieldsError(HttpStatusCode.UNPROCESSABLE, errors));
    }

    const hash = req.params.hash;
    const result = await orderControler.getByHash(hash);
    return res.status(HttpStatusCode.OK).send(result);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(error.httpCode).send(requestError(error.httpCode, error.message));
    }
    return res.status(HttpStatusCode.BAD_REQUEST).send(requestError(HttpStatusCode.BAD_REQUEST));
  }
});

export default orderRouter;

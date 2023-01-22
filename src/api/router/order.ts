import { matchedData } from 'express-validator';
import { Router, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { OrderInput } from 'db/models/order';
import orderRules from 'api/validators/order';
import * as orderControler from 'api/controllers/order';

const orderRouter = Router();

orderRouter.post('/', orderRules.addSingle, async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(422).json(errors.array());

  const payload = matchedData(req) as OrderInput;
  const result = await orderControler.addOrder(payload);
  return res.status(200).send(result);
});

orderRouter.get('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const result = await orderControler.getById(id);
  return res.status(200).send(result);
});
export default orderRouter;

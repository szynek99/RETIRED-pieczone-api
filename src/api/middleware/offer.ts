import isNull from 'lodash/isNull';
import { findOffer } from 'db/services/offer';
import { matchedData } from 'express-validator';
import { HttpStatusCode } from 'constants/common';
import { requestError } from 'api/utils/Response';
import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line import/prefer-default-export
export const checkResourceExistance = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = matchedData(req);

  const offer = await findOffer(id);

  if (isNull(offer)) {
    res.status(HttpStatusCode.NOT_FOUND).json(requestError('Nie znaleziono'));
    return;
  }
  req.images = offer.images;

  next();
};

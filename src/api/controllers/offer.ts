import { isArray } from 'lodash';
import { nanoid } from 'nanoid';
import * as dotenv from 'dotenv';
import isNull from 'lodash/isNull';
import { ROUTES } from 'constants/routes';
import { AddOfferInput } from 'types/offer';
import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { HttpStatusCode } from 'constants/common';
import { addOffer, findAllOffers, findOffer } from 'db/services/offer';
import { serverError, requestError } from 'api/utils/Response';
import queryParams from 'api/utils/queryParams';

dotenv.config();
const { API_URL } = process.env;

const postOffer = async (req: Request, res: Response) => {
  try {
    const properties = matchedData(req) as AddOfferInput;
    properties.images = [];
    const images = req.files?.images;

    if (images) {
      if (isArray(images)) {
        images.forEach((image) => {
          const hash = nanoid();
          image.mv(`offer/${hash}.jpg`);
          properties.images.push(`${API_URL}${ROUTES.UPLOADS.OFFER}/${hash}.jpg`);
        });
      } else {
        const hash = nanoid();
        images.mv(`offer/${hash}.jpg`);
        properties.images.push(`${API_URL}${ROUTES.UPLOADS.OFFER}/${hash}.jpg`);
      }
    }

    const result = await addOffer(properties);
    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError());
  }
};

const getAllOffers = async (req: Request, res: Response) => {
  try {
    const params = queryParams(matchedData(req));
    const { rows, count } = await findAllOffers(params);

    res.append('Access-Control-Expose-Headers', 'Content-Count');
    res.append('Content-Count', count.toString());

    res.status(HttpStatusCode.OK).json(rows);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError());
  }
};

const getOffer = async (req: Request, res: Response) => {
  try {
    const { id } = matchedData(req);
    const result = await findOffer(id);

    if (isNull(result)) {
      res.status(HttpStatusCode.NOT_FOUND).json(requestError('Nie znaleziono'));
      return;
    }
    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError());
  }
};

export default { getOffer, postOffer, getAllOffers };

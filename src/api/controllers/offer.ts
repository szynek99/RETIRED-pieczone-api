import { isArray } from 'lodash';
import { nanoid } from 'nanoid';
import * as dotenv from 'dotenv';
import isNull from 'lodash/isNull';
import { ROUTES } from 'constants/routes';
import { Request, Response } from 'express';
import queryParams from 'api/utils/queryParams';
import { matchedData } from 'express-validator';
import { HttpStatusCode } from 'constants/common';
import removeOfferImages from 'api/utils/removeOfferImages';
import { serverError, requestError } from 'api/utils/Response';
import { AddOfferInput, QueryParams, UpdateTypeProps } from 'types/offer';
import { addOffer, findAllOffers, findOffer, removeOffer, updateOffer } from 'db/services/offer';

dotenv.config();
const { API_URL } = process.env;

const postOffer = async (req: Request, res: Response) => {
  try {
    const properties = matchedData(req) as AddOfferInput;
    let images = req.files?.images;
    if (images && !isArray(images)) {
      images = [images];
    }

    properties.images = [];
    if (images) {
      images.forEach((image) => {
        const hash = nanoid();
        image.mv(`offer/${hash}.jpg`);
        properties.images.push(hash);
      });
    }

    const result = await addOffer(properties);
    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError());
  }
};

const getAllOffers = async (req: Request, res: Response) => {
  try {
    const params = queryParams<QueryParams>(matchedData(req));
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
    const processedResult = {
      ...result,
      images: result.images.map((imageHash) => ({
        title: imageHash,
        src: `${API_URL}${ROUTES.UPLOADS.OFFER}/${imageHash}.jpg`,
      })),
    };

    res.status(HttpStatusCode.OK).json(processedResult);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError());
  }
};

const putOffer = async (req: Request, res: Response) => {
  try {
    const { id, ...properties } = matchedData(req, { includeOptionals: true });
    let images = req.files?.images;
    if (images && !isArray(images)) {
      images = [images];
    }

    const offer = await findOffer(id);
    if (isNull(offer)) {
      res.status(HttpStatusCode.NOT_FOUND).json(requestError('Nie znaleziono'));
      return;
    }

    if (!properties.images) {
      properties.images = [];
    } else if (!isArray(properties.images)) {
      properties.images = [properties.images];
    }
    removeOfferImages(properties.images, offer.images);
    if (images) {
      images.forEach((image) => {
        const hash = nanoid();
        image.mv(`offer/${hash}.jpg`);
        properties.images.push(hash);
      });
    }

    const result = (await updateOffer(id, properties as UpdateTypeProps))[1].pop();
    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError());
  }
};

const deleteOffer = async (req: Request, res: Response) => {
  try {
    const { id } = matchedData(req);

    const offer = await findOffer(id);
    if (isNull(offer)) {
      res.status(HttpStatusCode.NOT_FOUND).json(requestError('Nie znaleziono'));
      return;
    }
    removeOfferImages(offer.images, offer.images);

    await removeOffer(id);
    res.status(HttpStatusCode.OK).json(offer);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError());
  }
};

export default { getOffer, postOffer, getAllOffers, putOffer, deleteOffer };

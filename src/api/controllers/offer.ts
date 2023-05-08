import isNull from 'lodash/isNull';
import { isArray, isNil } from 'lodash';
import { Request, Response } from 'express';
import queryParams from 'api/utils/queryParams';
import { matchedData } from 'express-validator';
import { HttpStatusCode } from 'constants/common';
import getImages from 'api/utils/offer/getImages';
import addImages from 'api/utils/offer/addImages';
import removeOfferImages from 'api/utils/offer/removeImages';
import processImagesOffer from 'api/utils/offer/processImages';
import { serverError, requestError } from 'api/utils/Response';
import { AddOfferInput, QueryParams, UpdateTypeProps } from 'types/offer';
import { addOffer, findAllOffers, findOffer, removeOffer, updateOffer } from 'db/services/offer';

const postOffer = async (req: Request, res: Response) => {
  try {
    const properties = matchedData(req) as AddOfferInput;
    const newImages = getImages(req.files?.images);

    properties.images = [];
    if (newImages) {
      addImages(newImages, properties.images);
    }

    const offer = await addOffer(properties);
    res.status(HttpStatusCode.OK).json(offer);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError());
  }
};

const getAllOffers = async (req: Request, res: Response) => {
  try {
    const params = queryParams<QueryParams>(matchedData(req));
    const { rows: offers, count } = await findAllOffers(params);

    res.append('Access-Control-Expose-Headers', 'Content-Count');
    res.append('Content-Count', count.toString());

    res.status(HttpStatusCode.OK).json(offers);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError());
  }
};

const getOffer = async (req: Request, res: Response) => {
  try {
    const { id } = matchedData(req);
    const offer = await findOffer(id);

    if (isNull(offer)) {
      res.status(HttpStatusCode.NOT_FOUND).json(requestError('Nie znaleziono'));
      return;
    }

    const processedOffer = processImagesOffer(offer);

    res.status(HttpStatusCode.OK).json(processedOffer);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError());
  }
};

const putOffer = async (req: Request, res: Response) => {
  try {
    const { id, ...properties } = matchedData(req, { includeOptionals: true });
    const newImages = getImages(req.files?.images);
    let { images: oldImages } = properties;

    if (isNil(oldImages)) {
      oldImages = [];
    } else if (!isArray(oldImages)) {
      oldImages = [oldImages];
    }

    removeOfferImages(properties.images, req.images);
    if (newImages) {
      addImages(newImages, properties.images);
    }

    const offer = (await updateOffer(id, properties as UpdateTypeProps))[1].pop();
    res.status(HttpStatusCode.OK).json(offer);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError());
  }
};

const deleteOffer = async (req: Request, res: Response) => {
  try {
    const { id } = matchedData(req, { includeOptionals: true });

    removeOfferImages(req.images, req.images);
    await removeOffer(id);

    res.status(HttpStatusCode.OK).json();
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError());
  }
};

export default { getOffer, postOffer, getAllOffers, putOffer, deleteOffer };

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
import {
  addOffer,
  findAllOffers,
  findOffer,
  getOfferCategoryPublic,
  removeOffer,
  updateOffer,
} from 'db/services/offer';

const postOffer = async (req: Request, res: Response) => {
  try {
    const newImages = getImages(req.files?.images);
    let payload = matchedData(req);
    payload.images = [];

    if (newImages) {
      payload = addImages(newImages, payload);
    }

    let offer = (await addOffer(payload as AddOfferInput)).dataValues;
    offer = processImagesOffer(offer);

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
    let offer = await findOffer(id);

    if (isNull(offer)) {
      res.status(HttpStatusCode.NOT_FOUND).json(requestError('Nie znaleziono'));
      return;
    }
    if (isNil(offer.images)) {
      offer.images = [];
    }
    offer = processImagesOffer(offer);

    res.status(HttpStatusCode.OK).json(offer);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError());
  }
};

const putOffer = async (req: Request, res: Response) => {
  try {
    let payload = matchedData(req, { includeOptionals: true });
    const newImages = getImages(req.files?.images);
    let { images: oldImages } = payload;

    if (isNil(oldImages)) {
      oldImages = [];
    } else if (!isArray(oldImages)) {
      oldImages = [oldImages];
    }

    if (isNil(payload.images)) {
      payload.images = [];
    } else if (!isArray(payload.images)) {
      payload.images = [payload.images];
    }

    removeOfferImages(payload.images, req.images);
    if (newImages) {
      payload = addImages(newImages, payload);
    }

    let offer = (await updateOffer(payload.id, payload as UpdateTypeProps))[1][0].dataValues;
    offer = processImagesOffer(offer);

    res.status(HttpStatusCode.OK).json(offer);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError());
  }
};

const deleteOffer = async (req: Request, res: Response) => {
  try {
    const { id } = matchedData(req, { includeOptionals: true });

    removeOfferImages([], req.images);
    await removeOffer(id);

    res.status(HttpStatusCode.OK).json();
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError());
  }
};

const getOfferPublic = async (req: Request, res: Response) => {
  try {
    const { category } = matchedData(req);

    const offers = await getOfferCategoryPublic(category);

    const processedOffers = offers.map((offer) => {
      let newOffer = { ...offer };
      if (isNil(offer.images)) {
        newOffer.images = [];
      }
      newOffer = processImagesOffer(offer);
      return newOffer;
    });

    res.status(HttpStatusCode.OK).json(processedOffers);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(serverError());
  }
};

export default { getOffer, postOffer, getAllOffers, putOffer, deleteOffer, getOfferPublic };

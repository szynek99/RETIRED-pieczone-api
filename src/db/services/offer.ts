import { OfferAttributes } from 'types/offer';
import Offer, { OfferInput } from 'db/models/offer';
import { QueryParams } from 'types/common';

export const addOffer = (payload: OfferInput): Promise<OfferAttributes> => Offer.create(payload);

export const findOffer = (id: number): Promise<OfferAttributes | null> =>
  Offer.findByPk(id, { raw: true });

export const findAllOffers = (
  queryParams: QueryParams,
): Promise<{ rows: OfferAttributes[]; count: number }> => {
  const { offset, pageSize, field, order } = queryParams;

  return Offer.findAndCountAll({ limit: pageSize, offset, order: [[field, order]] });
};

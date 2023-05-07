import { OfferAttributes } from 'types/offer';
import Offer, { OfferInput } from 'db/models/offer';

export const addOffer = (payload: OfferInput): Promise<OfferAttributes> => Offer.create(payload);

export const findOffer = (id: number): Promise<OfferAttributes | null> => Offer.findByPk(id);

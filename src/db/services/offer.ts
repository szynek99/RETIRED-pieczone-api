import { Op } from 'sequelize';
import Offer, { OfferInput } from 'db/models/offer';
import { OfferAttributes, QueryParams, UpdateTypeProps } from 'types/offer';

export const addOffer = (payload: OfferInput): Promise<OfferAttributes> => Offer.create(payload);

export const findOffer = (id: number): Promise<OfferAttributes | null> =>
  Offer.findByPk(id, { raw: true });

export const findAllOffers = (
  queryParams: QueryParams,
): Promise<{ rows: OfferAttributes[]; count: number }> => {
  const { offset, pageSize, field, order, category } = queryParams;

  return Offer.findAndCountAll({
    limit: pageSize,
    offset,
    order: [[field, order]],
    where: {
      category: {
        [Op.substring]: category || '',
      },
    },
  });
};

export const updateOffer = (
  id: number,
  props: UpdateTypeProps,
): Promise<[affectedCount: number, affectedRows: Offer[]]> =>
  Offer.update(props, { where: { id }, returning: true });

export const removeOffer = (id: number): Promise<number> => Offer.destroy({ where: { id } });

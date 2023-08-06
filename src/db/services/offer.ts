import { Op } from 'sequelize';
import { GET_ATTRIBUTES } from 'constants/offer';
import Offer, { OfferInput } from 'db/models/offer';
import { Categories, QueryParams, UpdateTypeProps } from 'types/offer';

export const addOffer = (payload: OfferInput) => Offer.create(payload, { raw: true });

export const findOffer = (id: number) => Offer.findByPk(id, { raw: true });

export const findAllOffers = (queryParams: QueryParams) => {
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
    attributes: GET_ATTRIBUTES,
    raw: true,
  });
};

export const updateOffer = (id: number, props: UpdateTypeProps) =>
  Offer.update(props, { where: { id }, returning: true });

export const removeOffer = (id: number) => Offer.destroy({ where: { id } });

export const resetOffer = async () => Offer.truncate({ cascade: true });

export const getOfferCategoryPublic = (category: Categories) =>
  Offer.findAll({
    where: { category, visible: true },
    order: [['placement', 'ASC']],
    raw: true,
  });

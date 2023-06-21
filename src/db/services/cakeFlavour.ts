import { QueryParams } from 'types/common';
import { GET_ATTRIBUTES } from 'constants/cakeFlavour';
import { UpdateFlavourProps } from 'types/cakeFlavour';
import CakeFlavour, { CakeFlavourInput } from 'db/models/cakeFlavour';

export const addCakeFlavour = (payload: CakeFlavourInput) =>
  CakeFlavour.create(payload, { raw: true });

export const getCakeFlavour = (id: number) => CakeFlavour.findByPk(id, { raw: true });

export const getAllCakeFlavours = (queryParams: QueryParams) => {
  const { offset, pageSize, field, order } = queryParams;

  return CakeFlavour.findAndCountAll({
    limit: pageSize,
    offset,
    order: [[field, order]],
    attributes: GET_ATTRIBUTES,
  });
};

export const getAllCakeFlavoursPublic = () =>
  CakeFlavour.findAll({
    where: { accessible: true },
    raw: true,
  });

export const removeCakeFlavour = (id: number) => CakeFlavour.destroy({ where: { id } });

export const getCakeFlavourByValue = (value: string) => CakeFlavour.findOne({ where: { value } });

export const updateCakeFlavour = (id: number, props: UpdateFlavourProps) =>
  CakeFlavour.update(props, { where: { id }, returning: true });

export const resetCakeFlavour = () => CakeFlavour.truncate({ cascade: true });

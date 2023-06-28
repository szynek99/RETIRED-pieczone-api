import { QueryParams } from 'types/common';
import { UpdateTypeProps } from 'types/cakeType';
import { GET_ATTRIBUTES } from 'constants/cakeType';
import CakeType, { CakeTypeInput } from 'db/models/cakeType';

export const addCakeType = (payload: CakeTypeInput) => CakeType.create(payload);

export const getCakeType = (id: number) => CakeType.findByPk(id, { raw: true });

export const getAllCakeTypes = (queryParams: QueryParams) => {
  const { offset, pageSize, field, order } = queryParams;

  return CakeType.findAndCountAll({
    limit: pageSize,
    offset,
    order: [[field, order]],
    attributes: GET_ATTRIBUTES,
  });
};

export const getAllCakeTypesPublic = () =>
  CakeType.findAll({
    where: { accessible: true },
    raw: true,
  });

export const removeCakeType = (id: number) => CakeType.destroy({ where: { id } });

export const getCakeTypeByValue = (value: string) => CakeType.findOne({ where: { value } });

export const updateCakeType = (id: number, props: UpdateTypeProps) =>
  CakeType.update(props, { where: { id }, returning: true });

export const resetCakeType = async () => CakeType.truncate({ cascade: true });

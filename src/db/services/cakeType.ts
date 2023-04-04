import { CakeTypeAttributes, UpdateTypeProps } from 'types/cakeType';
import CakeType, { CakeTypeInput } from 'db/models/cakeType';
import { QueryParams } from 'types/common';
import { off } from 'process';

export const addCakeType = (payload: CakeTypeInput): Promise<CakeTypeAttributes> =>
  CakeType.create(payload);

export const getCakeType = (id: number): Promise<CakeTypeAttributes | null> =>
  CakeType.findByPk(id);

export const getAllCakeTypes = (
  queryParams: QueryParams,
): Promise<{ rows: CakeTypeAttributes[]; count: number }> => {
  const { page, pageSize, field, order } = queryParams;
  let offset = (page - 1) * pageSize;
  offset = offset < 0 ? 0 : offset;

  return CakeType.findAndCountAll({ limit: pageSize, offset, order: [[field, order]] });
};

export const removeCakeType = (id: number): Promise<number> => CakeType.destroy({ where: { id } });

export const getCakeTypeByValue = (value: string): Promise<CakeTypeAttributes | null> =>
  CakeType.findOne({ where: { value } });

export const updateCakeType = (
  id: number,
  props: UpdateTypeProps,
): Promise<[affectedCount: number, affectedRows: CakeType[]]> =>
  CakeType.update(props, { where: { id }, returning: true });

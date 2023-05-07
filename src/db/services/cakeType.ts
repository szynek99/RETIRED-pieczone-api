import { QueryParams } from 'types/common';
import { ApiError } from 'api/utils/Error';
import { GET_ATTRIBUTES } from 'constants/cakeType';
import CakeType, { CakeTypeInput } from 'db/models/cakeType';
import { CakeTypeAttributes, UpdateTypeProps } from 'types/cakeType';

export const addCakeType = (payload: CakeTypeInput): Promise<CakeTypeAttributes> =>
  CakeType.create(payload);

export const getCakeType = (id: number): Promise<CakeTypeAttributes | null> =>
  CakeType.findByPk(id);

export const getAllCakeTypes = (
  queryParams: QueryParams,
): Promise<{ rows: CakeTypeAttributes[]; count: number }> => {
  const { offset, pageSize, field, order } = queryParams;

  return CakeType.findAndCountAll({
    limit: pageSize,
    offset,
    order: [[field, order]],
    attributes: GET_ATTRIBUTES,
  });
};

export const removeCakeType = (id: number): Promise<number> => CakeType.destroy({ where: { id } });

export const getCakeTypeByValue = (value: string): Promise<CakeTypeAttributes | null> =>
  CakeType.findOne({ where: { value } });

export const updateCakeType = (
  id: number,
  props: UpdateTypeProps,
): Promise<[affectedCount: number, affectedRows: CakeType[]]> =>
  CakeType.update(props, { where: { id }, returning: true });

export const resetCakeType = async (): Promise<void> => {
  try {
    await CakeType.truncate();
    return;
  } catch (error) {
    throw new ApiError('CakeType clear');
  }
};

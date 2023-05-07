import { QueryParams } from 'types/common';
import { ApiError } from 'api/utils/Error';
import { GET_ATTRIBUTES } from 'constants/cakeFlavour';
import CakeFlavour, { CakeFlavourInput } from 'db/models/cakeFlavour';
import { CakeFlavourAttributes, UpdateFlavourProps } from 'types/cakeFlavour';

export const addCakeFlavour = (payload: CakeFlavourInput): Promise<CakeFlavourAttributes> =>
  CakeFlavour.create(payload);

export const getCakeFlavour = (id: number): Promise<CakeFlavourAttributes | null> =>
  CakeFlavour.findByPk(id);

export const getAllCakeFlavours = (
  queryParams: QueryParams,
): Promise<{ rows: CakeFlavourAttributes[]; count: number }> => {
  const { offset, pageSize, field, order } = queryParams;

  return CakeFlavour.findAndCountAll({
    limit: pageSize,
    offset,
    order: [[field, order]],
    attributes: GET_ATTRIBUTES,
  });
};

export const removeCakeFlavour = (id: number): Promise<number> =>
  CakeFlavour.destroy({ where: { id } });

export const getCakeFlavourByValue = (value: string): Promise<CakeFlavourAttributes | null> =>
  CakeFlavour.findOne({ where: { value } });

export const updateCakeFlavour = (
  id: number,
  props: UpdateFlavourProps,
): Promise<[affectedCount: number, affectedRows: CakeFlavour[]]> =>
  CakeFlavour.update(props, { where: { id }, returning: true });

export const resetCakeFlavour = async (): Promise<void> => {
  try {
    await CakeFlavour.truncate();
    return;
  } catch (error) {
    throw new ApiError('CakeFlavour clear');
  }
};

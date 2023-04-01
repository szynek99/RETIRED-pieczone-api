import { CakeTypeAttributes, UpdateTypeProps } from 'types/cakeType';
import CakeType, { CakeTypeInput } from 'db/models/cakeType';

export const addCakeType = (payload: CakeTypeInput): Promise<CakeTypeAttributes> =>
  CakeType.create(payload);

export const getCakeType = (id: number): Promise<CakeTypeAttributes | null> =>
  CakeType.findByPk(id);

export const getAllCakeTypes = (): Promise<Array<CakeTypeAttributes>> => CakeType.findAll();

export const removeCakeType = (id: number): Promise<number> => CakeType.destroy({ where: { id } });

export const getCakeTypeByValue = (value: string): Promise<CakeTypeAttributes | null> =>
  CakeType.findOne({ where: { value } });

export const updateCakeType = (
  id: number,
  props: UpdateTypeProps,
): Promise<[affectedCount: number, affectedRows: CakeType[]]> =>
  CakeType.update(props, { where: { id }, returning: true });

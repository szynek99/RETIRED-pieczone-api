import { QueryParams } from 'types/common';
import { ApiError } from 'api/utils/Error';
import { OrderAttributes } from 'types/order';
import Order, { OrderInput, OrderOuput } from 'db/models/order';

export const addOrder = async (payload: OrderInput): Promise<OrderOuput> =>
  await Order.create(payload);

export const getOrderByHash = (hash: string): Promise<OrderOuput | null> =>
  Order.findOne({ where: { hash } });

export const getAllOrders = (
  queryParams: QueryParams,
): Promise<{ rows: OrderAttributes[]; count: number }> => {
  const { offset, pageSize, field, order } = queryParams;

  return Order.findAndCountAll({ limit: pageSize, offset, order: [[field, order]] });
};

export const resetOrder = async (): Promise<void> => {
  try {
    await Order.truncate();
    return;
  } catch (error) {
    throw new ApiError('Order clear');
  }
};

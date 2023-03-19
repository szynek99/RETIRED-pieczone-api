import { ApiError } from 'api/utils/Error';
import Order, { OrderInput, OrderOuput } from 'db/models/order';

export const addOrder = async (payload: OrderInput): Promise<OrderOuput> =>
  await Order.create(payload);

export const getOrderByHash = async (hash: string): Promise<OrderOuput | null> => {
  const order = await Order.findOne({ where: { hash } });

  if (!order) {
    return null;
  }
  return order;
};
export const resetOrder = async (): Promise<void> => {
  try {
    await Order.truncate();
    return;
  } catch (error) {
    throw new ApiError('User clear');
  }
};

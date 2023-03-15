import { NotFoundError } from 'api/utils/Error';
import Order, { OrderInput, OrderOuput } from 'db/models/order';

export const createOrder = async (payload: OrderInput): Promise<OrderOuput> =>
  await Order.create(payload);
export const getOrderByHash = async (hash: string): Promise<OrderOuput> => {
  const order = await Order.findOne({ where: { hash } });

  if (!order) {
    throw new NotFoundError('Order');
  }
  return order;
};

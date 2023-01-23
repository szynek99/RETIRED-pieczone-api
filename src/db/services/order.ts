import { NotFoundError } from 'api/utils/Error';
import Order, { OrderInput, OrderOuput } from 'db/models/order';

export const createOrder = async (payload: OrderInput): Promise<OrderOuput> => {
  const hash = (Math.random() + 1).toString(36).substring(7);
  const processedPayload = {
    ...payload,
    hash,
  };
  return await Order.create(processedPayload);
};
export const getOrderByHash = async (hash: string): Promise<OrderOuput> => {
  const order = await Order.findOne({ where: { hash } });

  if (!order) {
    throw new NotFoundError('Order');
  }
  return order;
};

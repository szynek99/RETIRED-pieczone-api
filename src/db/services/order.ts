import Order, { OrderInput, OrderOuput } from 'db/models/order';

export const createOrder = async (payload: OrderInput): Promise<OrderOuput> => {
  const order = await Order.create(payload);
  return order;
};
export const getOrderById = async (id: number): Promise<OrderOuput> => {
  const order = await Order.findByPk(id);

  if (!order) {
    // @todo throw custom error
    throw new Error('not found');
  }

  return order;
};

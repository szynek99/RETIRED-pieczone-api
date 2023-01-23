import { createOrder, getOrderByHash } from 'db/services/order';
import { OrderInput, OrderOuput } from 'db/models/order';

export const addOrder = async (payload: OrderInput): Promise<OrderOuput> => {
  return await createOrder(payload);
};
export const getByHash = async (hash: string): Promise<OrderOuput> => {
  return await getOrderByHash(hash);
};

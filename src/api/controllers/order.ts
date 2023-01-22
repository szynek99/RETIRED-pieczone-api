import { createOrder, getOrderById } from 'db/services/order';
import { OrderInput, OrderOuput } from 'db/models/order';

export const addOrder = async (payload: OrderInput): Promise<OrderOuput> => {
  return await createOrder(payload);
};
export const getById = async (id: number): Promise<OrderOuput> => {
  return await getOrderById(id);
};

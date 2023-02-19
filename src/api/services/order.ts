import { OrderInput } from 'db/models/order';
import { createOrder, getOrderByHash } from 'db/services/order';

export const addOrder = async (payload: OrderInput) => await createOrder(payload);

export const getByHash = async (hash: string) => await getOrderByHash(hash);

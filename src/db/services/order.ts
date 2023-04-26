import { Op } from 'sequelize';
import { ApiError } from 'api/utils/Error';
import Order, { OrderInput, OrderOuput } from 'db/models/order';
import { QueryParams, OrderAttributes, UpdateOrderProps } from 'types/order';

export const addOrder = async (payload: OrderInput): Promise<OrderOuput> =>
  await Order.create(payload);

export const getOrderById = (id: string): Promise<OrderOuput | null> => Order.findByPk(id);

export const getOrderByHash = (hash: string): Promise<OrderOuput | null> =>
  Order.findOne({ where: { hash } });

export const updateOrder = (
  id: string,
  props: UpdateOrderProps,
): Promise<[affectedCount: number, affectedRows: Order[]]> =>
  Order.update(props, { where: { id }, returning: true });

export const getAllOrders = (
  queryParams: QueryParams,
): Promise<{ rows: OrderAttributes[]; count: number }> => {
  const { offset, pageSize, field, order, firstname, surname, cakeWeight, createdAt, status } =
    queryParams;

  return Order.findAndCountAll({
    limit: pageSize,
    offset,
    order: [[field, order]],
    where: {
      createdAt: {
        [Op.gte]: createdAt || '2000-01-01 00:00:00.000',
      },
      firstname: {
        [Op.substring]: firstname || '',
      },
      surname: {
        [Op.substring]: surname || '',
      },
      cakeWeight: {
        [Op.gte]: cakeWeight || 0,
      },
      status: {
        [Op.substring]: status || '',
      },
    },
  });
};

export const resetOrder = async (): Promise<void> => {
  try {
    await Order.truncate();
    return;
  } catch (error) {
    throw new ApiError('Order clear');
  }
};

import { Op } from 'sequelize';
import { GET_ATTRIBUTES } from 'constants/order';
import Order, { OrderInput } from 'db/models/order';
import { QueryParams, UpdateOrderProps } from 'types/order';

export const addOrder = async (payload: OrderInput) => await Order.create(payload, { raw: true });

export const getOrderById = (id: string) => Order.findByPk(id, { raw: true });

export const getOrdersByIds = (ids: string[]) =>
  Order.findAll({
    where: {
      id: { [Op.in]: ids },
    },
    raw: true,
  });

export const getOrderByHash = (hash: string, attributes?: string[]) =>
  Order.findOne({ where: { hash }, raw: true, attributes });

export const updateOrder = (id: string, props: UpdateOrderProps) =>
  Order.update(props, { where: { id }, returning: true });

export const getAllOrders = (queryParams: QueryParams) => {
  const {
    offset,
    pageSize,
    field,
    order,
    firstname,
    surname,
    cakeWeight,
    createdAt,
    pickupDate,
    status,
  } = queryParams;

  return Order.findAndCountAll({
    limit: pageSize,
    offset,
    order: [[field, order]],
    where: {
      createdAt: {
        [Op.gte]: createdAt || '2000-01-01 00:00:00.000',
      },
      pickupDate: {
        [Op.gte]: pickupDate || '2000-01-01 00:00:00.000',
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
    attributes: GET_ATTRIBUTES,
    raw: true,
  });
};

export const countByCakeType = (cakeType: string) => Order.count({ where: { cakeType } });

export const countByCakeFlavour = (cakeFlavour: string) => Order.count({ where: { cakeFlavour } });

export const removeOrder = (id: string | string[]) => Order.destroy({ where: { id } });

export const resetOrder = () => Order.truncate({ cascade: true });

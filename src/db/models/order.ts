import sequelizeConnection from 'db/config';
import { OrderAttributes } from 'types/order';
import { INTEGER, Model, STRING, Optional } from 'sequelize';

export interface OrderInput extends Optional<OrderAttributes, 'id'> {}

export interface OrderOuput extends Required<OrderAttributes> {}

class Order extends Model<OrderAttributes, OrderInput> implements OrderAttributes {
  public id!: number;
  public firstName!: string;
  public secondName!: string;
}

Order.init(
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: STRING,
      allowNull: false,
    },
    secondName: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    sequelize: sequelizeConnection,
  },
);

export default Order;

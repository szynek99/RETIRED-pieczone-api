import sequelize from 'db/config';
import { CakeShape, OrderAttributes, OrderStatus, SpongeColour } from 'types/order';
import { INTEGER, Model, STRING, Optional, FLOAT, BOOLEAN } from 'sequelize';

export type OrderInput = Optional<OrderAttributes, 'id'>;

export type OrderOuput = Required<OrderAttributes>;

class Order extends Model<OrderAttributes, OrderInput> implements OrderAttributes {
  public id!: number;

  public hash!: string;

  public firstname!: string;

  public surname!: string;

  public status!: OrderStatus;

  public phoneNumber!: string;

  public occasion!: string | null;

  public cakeType!: string;

  public cakeFlavour!: string;

  public spongeColour!: SpongeColour;

  public cakeWeight!: number;

  public cakeShape!: CakeShape;

  public cakeInscription!: string | null;

  public alcoholAllowed!: boolean;

  public commentsToOrder!: string | null;

  public imageUrl!: string | null;
}

Order.init(
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    hash: {
      type: STRING,
      allowNull: false,
    },
    firstname: {
      type: STRING,
      allowNull: false,
    },
    surname: {
      type: STRING,
      allowNull: false,
    },
    status: {
      type: STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: STRING,
      allowNull: false,
    },
    occasion: {
      type: STRING,
      allowNull: true,
    },
    cakeType: {
      type: STRING,
      allowNull: false,
    },
    cakeFlavour: {
      type: STRING,
      allowNull: false,
    },
    spongeColour: {
      type: STRING,
      allowNull: false,
    },
    cakeWeight: {
      type: FLOAT,
      allowNull: false,
    },
    cakeShape: {
      type: STRING,
      allowNull: false,
    },
    cakeInscription: {
      type: STRING,
      allowNull: true,
    },
    alcoholAllowed: {
      type: BOOLEAN,
      allowNull: false,
    },
    commentsToOrder: {
      type: STRING,
      allowNull: true,
    },
    imageUrl: {
      type: STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'users',
    timestamps: false,
    sequelize,
  },
);

export default Order;

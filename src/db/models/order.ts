import sequelize from 'db/connection';
import { UUID, UUIDV4, Model, STRING, Optional, FLOAT, BOOLEAN, DATE, Sequelize } from 'sequelize';
import { CakeShape, OrderAttributes, OrderStatus, SpongeColour } from 'types/order';

export type OrderInput = Optional<OrderAttributes, 'id' | 'status'>;

export type OrderOuput = Required<OrderAttributes>;

class Order extends Model<OrderAttributes, OrderInput> implements OrderAttributes {
  public id!: string;

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

  public createdAt!: Date;

  public updatedAt!: Date;
}

Order.init(
  {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
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
      defaultValue: 'pending',
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
    createdAt: {
      type: DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
    updatedAt: {
      type: DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
  },
  {
    tableName: 'Order',
    timestamps: true,
    sequelize,
  },
);

export default Order;

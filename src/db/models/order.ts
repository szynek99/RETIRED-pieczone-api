import sequelize from 'db/connection';
import { CakeShape, OrderAttributes, OrderStatus, SpongeColour } from 'types/order';
import { UUID, UUIDV4, Model, STRING, Optional, FLOAT, BOOLEAN, DATE, Sequelize } from 'sequelize';

export type OrderInput = Optional<OrderAttributes, 'id' | 'status' | 'createdAt' | 'updatedAt'>;

export type OrderOuput = Required<OrderAttributes>;

class Order extends Model<OrderAttributes, OrderInput> implements OrderAttributes {
  public id!: string;

  public hash!: string;

  public firstname!: string;

  public pickupDate!: Date;

  public surname!: string;

  public status!: OrderStatus;

  public phoneNumber!: string;

  public occasion!: string | null;

  public cakeType!: string;

  public cakeFlavour!: string | null;

  public spongeColour!: SpongeColour;

  public cakeWeight!: number;

  public cakeShape!: CakeShape;

  public cakeInscription!: string | null;

  public alcoholAllowed!: boolean;

  public commentsToOrder!: string | null;

  public imageAttached!: boolean;

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
    pickupDate: {
      type: DATE,
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
      references: {
        model: 'CakeType',
        key: 'value',
      },
    },
    cakeFlavour: {
      type: STRING,
      allowNull: true,
      references: {
        model: 'CakeFlavour',
        key: 'value',
      },
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
    imageAttached: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: false,
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

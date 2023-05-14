import { DataTypes, Sequelize } from 'sequelize';

const mSequelize = {};

jest.mock('db/connection', () => mSequelize);

const modelStaticMethodMocks = {
  init: jest.fn(),
};

jest.mock('sequelize', () => {
  class MockModel {
    public static init(attributes: any, options: any) {
      modelStaticMethodMocks.init(attributes, options);
    }
  }
  return {
    ...jest.requireActual('sequelize'),
    Model: MockModel,
  };
});

describe('Order model', () => {
  it('Model.init', async () => {
    await import('db/models/order');
    expect(modelStaticMethodMocks.init).toBeCalledWith(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        hash: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        firstname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        surname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 'pending',
        },
        phoneNumber: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        occasion: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        cakeType: {
          type: DataTypes.STRING,
          allowNull: false,
          references: {
            model: 'CakeType',
            key: 'value',
          },
        },
        cakeFlavour: {
          type: DataTypes.STRING,
          allowNull: true,
          references: {
            model: 'CakeFlavour',
            key: 'value',
          },
        },
        spongeColour: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        cakeWeight: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        cakeShape: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        cakeInscription: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        alcoholAllowed: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        commentsToOrder: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        imageAttached: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          allowNull: false,
        },
      },
      {
        tableName: 'Order',
        sequelize: mSequelize,
        timestamps: true,
      },
    );
  });
});

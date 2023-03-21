import { DataTypes } from 'sequelize';

const mSequelize = {};

jest.mock('db/connection', () => mSequelize);

const modelStaticMethodMocks = {
  init: jest.fn(),
};

jest.mock('sequelize', () => {
  class MockModel {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        },
        cakeFlavour: {
          type: DataTypes.STRING,
          allowNull: false,
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
        imageUrl: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        tableName: 'Order',
        sequelize: mSequelize,
        timestamps: false,
      },
    );
  });
});

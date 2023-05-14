import { DataTypes } from 'sequelize';

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

describe('Offer model', () => {
  it('Model.init', async () => {
    await import('db/models/offer');
    expect(modelStaticMethodMocks.init).toBeCalledWith(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        placement: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        visible: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
        category: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        images: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: true,
        },
      },
      {
        tableName: 'Offer',
        sequelize: mSequelize,
        timestamps: false,
      },
    );
  });
});

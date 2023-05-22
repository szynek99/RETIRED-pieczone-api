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

describe('Cake type model', () => {
  it('Model.init', async () => {
    await import('db/models/cakeType');
    expect(modelStaticMethodMocks.init).toBeCalledWith(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        value: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        accessible: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
        customizable: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        tableName: 'CakeType',
        timestamps: false,
        sequelize: mSequelize,
      },
    );
  });
});

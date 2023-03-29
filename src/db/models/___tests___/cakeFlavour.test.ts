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

describe('Cake flavour model', () => {
  it('Model.init', async () => {
    await import('db/models/cakeFlavour');
    expect(modelStaticMethodMocks.init).toBeCalledWith(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        value: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        accessible: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
      },
      {
        tableName: 'CakeFlavour',
        timestamps: false,
        sequelize: mSequelize,
      },
    );
  });
});

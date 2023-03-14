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

describe('User model', () => {
  it('Model.init', async () => {
    await import('db/models/user');
    expect(modelStaticMethodMocks.init).toBeCalledWith(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        username: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        role: { type: DataTypes.STRING, allowNull: false },
      },
      {
        tableName: 'User',
        sequelize: mSequelize,
        timestamps: false,
      },
    );
  });
});

import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from 'db/connection';
import { Role, UserAttributes } from 'types/auth';

export type UserInput = Optional<UserAttributes, 'id'>;

export type UserOuput = Required<UserAttributes>;

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: string;

  public username!: string;

  public password!: string;

  public role!: Role;
}
export const USER_MODEL = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

User.init(USER_MODEL, {
  timestamps: false,
  tableName: 'User',
  sequelize,
});

export default User;

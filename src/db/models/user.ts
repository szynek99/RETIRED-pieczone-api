import { UUID, Model, STRING, Optional, UUIDV4 } from 'sequelize';
import sequelize from 'db/config';
import { Role, UserAttributes } from 'types/auth';

export type UserInput = Optional<UserAttributes, 'id'>;

export type UserOuput = Required<UserAttributes>;

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: string;

  public username!: string;

  public password!: string;

  public role!: Role;
}

User.init(
  {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    username: {
      type: STRING,
      allowNull: false,
    },
    password: {
      type: STRING,
      allowNull: false,
    },
    role: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    sequelize,
  },
);

export default User;

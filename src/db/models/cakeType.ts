import sequelize from 'db/connection';
import { CakeTypeAttributes } from 'types/cakeType';
import { INTEGER, Model, STRING, Optional, BOOLEAN } from 'sequelize';

export type CakeTypeInput = Optional<CakeTypeAttributes, 'id'>;

export type CakeTypeOuput = Required<CakeTypeAttributes>;

class CakeType extends Model<CakeTypeAttributes, CakeTypeInput> implements CakeTypeAttributes {
  public id!: number;

  public name!: string;

  public value!: string;

  public accessible!: boolean;

  public customizable!: boolean;

  public description!: string | undefined;
}

CakeType.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    value: {
      type: STRING,
      unique: true,
      allowNull: false,
    },
    accessible: {
      type: BOOLEAN,
      defaultValue: true,
    },
    customizable: {
      type: BOOLEAN,
      defaultValue: true,
    },
    description: {
      type: STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'CakeType',
    timestamps: false,
    sequelize,
  },
);

export default CakeType;

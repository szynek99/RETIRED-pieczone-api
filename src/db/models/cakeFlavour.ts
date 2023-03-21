import sequelize from 'db/connection';
import { CakeFlavourAttributes } from 'types/cakeFlavour';
import { INTEGER, Model, STRING, Optional, BOOLEAN } from 'sequelize';

export type CakeFlavourInput = Optional<CakeFlavourAttributes, 'id'>;

export type CakeFlavourOuput = Required<CakeFlavourAttributes>;

class CakeFlavour
  extends Model<CakeFlavourAttributes, CakeFlavourInput>
  implements CakeFlavourAttributes
{
  public id!: number;

  public name!: string;

  public value!: string;

  public accessible!: boolean;
}

CakeFlavour.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    value: {
      type: STRING,
      allowNull: false,
    },
    accessible: {
      type: BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: 'CakeFlavour',
    timestamps: false,
    sequelize,
  },
);

export default CakeFlavour;

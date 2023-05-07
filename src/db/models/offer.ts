import sequelize from 'db/connection';
import { Categories, OfferAttributes } from 'types/offer';
import { INTEGER, Model, STRING, Optional, BOOLEAN, ARRAY } from 'sequelize';

export type OfferInput = Optional<OfferAttributes, 'id'>;

export type OfferOuput = Required<OfferAttributes>;

class Offer extends Model<OfferAttributes, OfferInput> implements OfferAttributes {
  public id!: number;

  public title!: string;

  public placement!: number;

  public visible!: boolean;

  public category!: Categories;

  public images!: string[];

  public description!: string;
}

Offer.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: STRING,
      allowNull: false,
    },
    placement: {
      type: INTEGER,
      allowNull: false,
    },
    visible: {
      type: BOOLEAN,
      defaultValue: true,
    },
    category: {
      type: STRING,
      allowNull: false,
    },
    description: {
      type: STRING,
      allowNull: true,
    },
    images: {
      type: ARRAY(STRING),
      allowNull: true,
    },
  },
  {
    tableName: 'Offer',
    timestamps: false,
    sequelize,
  },
);

export default Offer;

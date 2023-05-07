/* eslint-disable import/no-import-module-exports */
import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('Offer', {
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
    });
  },

  // tslint:disable-next-line:variable-name
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('Offer');
  },
};

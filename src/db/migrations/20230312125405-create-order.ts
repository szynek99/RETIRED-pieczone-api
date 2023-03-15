/* eslint-disable linebreak-style */
/* eslint-disable import/no-import-module-exports */
import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  // tslint:disable-next-line:variable-name
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('Order', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      occasion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cakeType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cakeFlavour: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      spongeColour: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cakeWeight: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      cakeShape: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cakeInscription: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      alcoholAllowed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      commentsToOrder: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    });
  },

  // tslint:disable-next-line:variable-name
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('Order');
  },
};

/* eslint-disable import/no-import-module-exports */
import { QueryInterface, DataTypes, Sequelize } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('Order', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
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
        defaultValue: 'pending',
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
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
    });
  },

  // tslint:disable-next-line:variable-name
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('Order');
  },
};

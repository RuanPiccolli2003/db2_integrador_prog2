const { Sequelize, DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('log_pedido_status', {
      id_log: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      id_pedido: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'pedido',
          key: 'id_pedido'
        },
        onDelete: 'CASCADE'
      },
      status_anterior: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      status_novo: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      data_alteracao: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('log_pedido_status');
  }
};

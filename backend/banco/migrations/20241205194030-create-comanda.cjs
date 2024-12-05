const { Sequelize, DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('comanda', {
      id_comanda: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'usuario',
          key: 'id_usuario'
        },
        onDelete: 'CASCADE'
      },
      status: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'Aberta',
        validate: {
          isIn: [['Aberta', 'Fechada']]
        }
      },
      data_abertura: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      },
      data_fechamento: {
        type: DataTypes.DATE,
        allowNull: true
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('comanda');
  }
};

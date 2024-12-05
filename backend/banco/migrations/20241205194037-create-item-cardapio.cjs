const { Sequelize, DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('item_cardapio', {
      id_item: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      nome: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      tipo: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          isIn: [['Bebida', 'Prato']]
        }
      },
      preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0
        }
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('item_cardapio');
  }
};

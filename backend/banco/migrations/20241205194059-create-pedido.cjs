const { Sequelize, DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('pedido', {
      id_pedido: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      id_comanda: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'comanda',
          key: 'id_comanda'
        },
        onDelete: 'CASCADE'
      },
      id_item: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'item_cardapio',
          key: 'id_item'
        },
        onDelete: 'CASCADE'
      },
      quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1
        }
      },
      somaprecototal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0
        }
      },
      status: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          isIn: [['Registrado', 'Produzindo', 'Pronto', 'Entregue', 'Cancelado', 'Rejeitado']]
        }
      },
      destino: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          isIn: [['Copa', 'Cozinha']]
        }
      },
      data_abertura_pedido: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('pedido');
  }
};

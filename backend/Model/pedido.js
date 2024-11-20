import { Sequelize } from 'sequelize';
import conexao from '../banco/conexao_db.js';


const pedido = conexao.define('pedido', {
  id_pedido: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  id_comanda: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'comandas',
      key: 'id_comanda',
    },
    onDelete: 'CASCADE',
  },
  id_item: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'items',
      key: 'id_item',
    },
    onDelete: 'CASCADE',
  },
  quantidade: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  somaprecototal: {
    type: Sequelize.DECIMAL,
    allowNUll: false
  },
  status: {
    type: Sequelize.STRING(50),
    allowNull: false,
    defaultValue: 'Registrado',
    validate: {
      isIn: [['Registrado', 'Produzindo', 'Pronto', 'Entregue', 'Cancelado', 'Rejeitado']],
    },
  },
  destino: {
    type: Sequelize.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['Copa', 'Cozinha']],
    },
  },
  data_abertura_pedido: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP AT TIME ZONE 'America/Sao_Paulo'"),
  }
}, {
  freezeTableName: true,
  timestamps: false,
});



export default pedido;

//lembrar de colocar os indexes


//CREATE INDEX idx_pedido_status ON pedido (status);
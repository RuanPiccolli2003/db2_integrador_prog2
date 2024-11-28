import { Sequelize } from 'sequelize';
import conexao from '../banco/conexao_db.js';


const comanda = conexao.define('comanda', {
  id_comanda: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  id_usuario: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'usuarios', 
      key: 'id_usuario',
    },
    onDelete: 'CASCADE', 
  },
  status: {
    type: Sequelize.STRING(50),
    allowNull: false,
    defaultValue: 'Aberta', 
    validate: {
      isIn: [['Aberta', 'Fechada']], 
    },
  },
  data_abertura: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP AT TIME ZONE 'America/Sao_Paulo'"),
  },
  data_fechamento: {
    type: Sequelize.DATE,
    allowNull: true,
  },
}, {
    freezeTableName: true, 
  timestamps: false, 
});

export default comanda;

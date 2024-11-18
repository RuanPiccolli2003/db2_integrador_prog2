import { Sequelize } from 'sequelize';
import conexao from '../banco/conexao_db.js';

const ordem = conexao.define('ordem', {
    id_ordem: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    id_pedido: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "pedidos",
            key: 'id_pedido',
        },
        onDelete: 'CASCADE',
    },
}, {
    freezeTableName: true, 
  timestamps: false, 
});



export default ordem;
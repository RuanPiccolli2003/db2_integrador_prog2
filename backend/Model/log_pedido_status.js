import { Sequelize } from 'sequelize';
import conexao from '../banco/conexao_db.js';

const log_pedido_status = conexao.define('log_pedido_status', {
    id_log: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    id_pedido: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'pedidos',
            key: 'id_pedido',
        },
        onDelete: 'CASCADE',
    },
    status_anterior: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    status_novo: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    data_alteracao: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP AT TIME ZONE 'America/Sao_Paulo'"),
    },
}, {
    freezeTableName: true, 
    timestamps: false, 
});

export default log_pedido_status;

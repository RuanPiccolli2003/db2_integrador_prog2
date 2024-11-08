import { Sequelize } from 'sequelize';
import conexao from '../banco/conexao_db.js';

export default conexao.define('usuario', {
    id_usuario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING, // Changed from VARCHAR to STRING
        allowNull: false
    },
    email: {
        type: Sequelize.STRING, // Changed from VARCHAR to STRING
        allowNull: false,
        unique: true
    },
    senha: {
        type: Sequelize.STRING, // Changed from VARCHAR to STRING
        allowNull: false
    },
}, {
    freezeTableName: true,
    timestamps: false, // Adiciona as colunas createdAt e updatedAt automaticamente necessário por algum motivo
}); 

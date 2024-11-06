import { Sequelize } from 'sequelize';
import conexao from '../Model/conexao_db.js';

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
    }
});

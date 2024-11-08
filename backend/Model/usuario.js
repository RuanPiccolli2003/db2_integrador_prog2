import { Sequelize } from 'sequelize';
import conexao from '../banco/conexao_db.js';
import conexao_dbAzure from "../banco/conexao_dbAzure.js";

export default conexao.define('usuario', {
    id_usuario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    email: {
        type: Sequelize.STRING, 
        allowNull: false,
        unique: true
    },
    senha: {
        type: Sequelize.STRING, 
        allowNull: false
    },
}, {
    freezeTableName: true,
    timestamps: false, 
}); 

import bcrypt from "bcryptjs";
import { Sequelize } from 'sequelize';
import conexao from '../banco/conexao_db.js';
import conexao_dbAzure from "../banco/conexao_dbAzure.js";



const usuario = conexao.define('usuario', {
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

usuario.beforeCreate(async (usuario, options) => {
    const salt = await bcrypt.genSalt(10);
    usuario.senha = await bcrypt.hash(usuario.senha, salt);
});

usuario.beforeUpdate(async (usuario, options) => {
    if (usuario.senha) {
        const salt = await bcrypt.genSalt(10);
        usuario.senha = await bcrypt.hash(usuario.senha, salt);
    }
});

export default usuario;

const Sequelize = require('sequellize')
const banco = require('./db')
const sequelize = require('./conexao_db')



const Usuario = banco.define('usuario',{
    id_usuario:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true

    },

            nome:{
                type: Sequelize.VARCHAR,
                allowNull: false
            
    },

            email: {
                type: Sequelize.VARCHAR,
                allowNull: false,
                unique: true



            },

            senha:{
                type: Sequelize.VARCHAR,
                allowNull: false


            },


})

module.exports = Usuario

export default banco

import banco from "./usuario";
import sequelize from "./conexao_db";
const Sequelize = require('sequelize')



const Comanda = banco.define('comanda',{
    id_comanda:{



            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNUll: false,
            primaryKey: true

    },

            id_usuario:{
                type: Sequelize.INTEGER,
               foreignKey:{
                    allowNull: false


               }

    },

            status: {
                type: Sequelize.VARCHAR,
                allowNUll: false,
                    idx_comanda_status: [
                        {
                        field:['status']
                        
                        }


                    ]


    },

            senha:{
                type: Sequelize.VARCHAR,
                allowNUll: false


    },

            data_abertura:{
                type: Sequelize.DATE,
                allowNUll: false
                
    },

            data_fechamento:{
                tyoe: Sequelize.DATE,
                allowNUll: true

     }


})

module.exports = Comanda

CREATE INDEX  ON comanda (status);
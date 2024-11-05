import banco from "./usuario";
import sequelize from "./conexao_db";
const Sequelize = require('sequelize')



const ItemCardapio = banco.define('item_cardapio',{
        id_item:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNUll: false,
            primaryKey: true

    },

        nome:{
             type: Sequelize.VARCHAR,
             foreignKey: false
                

    },

        tipo: {
                type: Sequelize.VARCHAR,
                allowNUll: false



    },

        preco:{
                type: Sequelize.DECIMAL,
                allowNUll: false
        }


})

module.exports = ItemCardapio
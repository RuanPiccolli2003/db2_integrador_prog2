import { Sequelize } from 'sequelize';
import conexao from '../banco/conexao_db.js';
import conexao_dbAzure from "../banco/conexao_dbAzure.js";



const item_cardapio = conexao.define('item_cardapio',{
        id_item:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNUll: false,
            primaryKey: true
    },
        nome:{
             type: Sequelize.STRING,
             foreignKey: false                
    },
        tipo: {
                type: Sequelize.STRING,
                allowNUll: false
    },
        preco:{
                type: Sequelize.DECIMAL,
                allowNUll: false
        },
}, {
        freezeTableName: true,
        timestamps: false, 
    });

export default item_cardapio;
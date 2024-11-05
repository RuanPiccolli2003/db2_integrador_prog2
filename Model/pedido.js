import sequelize from "./conexao_db";
import banco from "./usuario";




const Pedido = banco.define('pedido',{
        id_pedido:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true

    },

        id_comanda:{
                type: Sequelize.INTEGER,
                foreignKey:{
                    allowNull: false
                }
            
    },

        id_item:{
               foreignKey:{
                allowNull: false
               }


            },

        senha:{
                type: Sequelize.VARCHAR,
                allowNull: false


            },


})

//lembrar de colocar os indexes


//CREATE INDEX idx_pedido_status ON pedido (status);
import { Sequelize } from 'sequelize';


const conexao =  new Sequelize('restaurante','postgres','postgres', {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432

})

export default conexao;
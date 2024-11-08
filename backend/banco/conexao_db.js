import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
 


const conexao =  new Sequelize(process.env.DB_NAME,process.env.DB_USERNAME,process.env.DB_PASSWORD, {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.PGPORT

})


export default conexao;

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();


const azureBDconfig = {
    username: process.env.DB_AZURE_USERNAME,
    host: process.env.DB_AZURE_HOST,
    database: process.env.DB_AZURE_DATABASE,
    password: process.env.DB_AZURE_PASSWORD,
    port: process.env.DB_AZURE_PORT,
    dialect: process.env.DB_AZURE_DIALECT,
    ssl: process.env.DB_AZURE_SSL
};

const conexao_dbAzure = new Sequelize(azureBDconfig.database, azureBDconfig.username, azureBDconfig.password, {
    host: azureBDconfig.host,
    dialect: azureBDconfig.dialect,
    port: azureBDconfig.port,
    dialectOptions: {
        ssl: {
        require: azureBDconfig.ssl,
        rejectUnauthorized: false
        }
    }
});

export default conexao_dbAzure;
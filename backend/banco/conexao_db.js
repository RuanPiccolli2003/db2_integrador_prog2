import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const UsarBancoDeDadosAzure = process.env.USAR_BD_AZURE === 'true';

const config = UsarBancoDeDadosAzure
  ? {
      database: process.env.DB_AZURE_DATABASE,
      username: process.env.DB_AZURE_USERNAME,
      password: process.env.DB_AZURE_PASSWORD,
      host: process.env.DB_AZURE_HOST,
      port: process.env.DB_AZURE_PORT,
      dialect: process.env.DB_AZURE_DIALECT,
      timezone: '-06:00',
      dialectOptions: {
        ssl: {
          require: process.env.DB_AZURE_SSL === 'true',
          rejectUnauthorized: false,
        },
      },
    }
  : {
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.PGPORT,
      dialect: process.env.DB_DIALECT,
    };

const conexao = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    port: config.port,
    timezone: '-06:00',
    dialectOptions: config.dialectOptions || {},
  }
);

export default conexao;

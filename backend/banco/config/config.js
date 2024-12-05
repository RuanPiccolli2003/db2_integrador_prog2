import dotenv from 'dotenv';

dotenv.config();

export default {
  development: {
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.PGPORT,
    dialect: process.env.DB_DIALECT || 'postgres',
  },
  production: {
    database: process.env.DB_AZURE_DATABASE,
    username: process.env.DB_AZURE_USERNAME,
    password: process.env.DB_AZURE_PASSWORD,
    host: process.env.DB_AZURE_HOST,
    port: process.env.DB_AZURE_PORT,
    dialect: process.env.DB_AZURE_DIALECT || 'postgres',
    timezone: '-06:00',
    dialectOptions: {
      ssl: {
        require: process.env.DB_AZURE_SSL === 'true',
        rejectUnauthorized: false,
      },
    },
  },
};

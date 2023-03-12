import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASSWORD;
const dbPort = parseInt(process.env.DB_PORT || '5432', 10);

export const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: 'postgres',
  host: dbHost,
  port: dbPort,
  logging: false,
});

export default sequelizeConnection;

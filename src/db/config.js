// eslint-disable-next-line  @typescript-eslint/no-var-requires
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    host: '127.0.0.1',
    dialect: 'postgres',
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  test: {
    host: '127.0.0.1',
    dialect: 'postgres',
    database: process.env.DB_NAME,
    port: '5433',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
};

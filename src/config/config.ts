require('dotenv').config();

export = {
  development: {
    database: process.env.DB_NAME,
    dialect: 'postgres',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: '127.0.0.1',
  },
  production: {
    database: process.env.DB_NAME,
    dialect: 'postgres',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  },
  test: {
    database: process.env.POSTGRES_DB,
    dialect: 'postgres',
    username: process.env.PGUSER,
    password: null
  }
};

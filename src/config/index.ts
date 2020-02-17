import { DB } from "../lib";
import dotenv from 'dotenv';
import Logger from './winston';

dotenv.config();

const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV
const logEnv = NODE_ENV === 'production' ? 'info' : 'debug';
const DB: { [key: string]: DB} = {
  development: {
    database: process.env.DB_NAME,
    dialect: 'postgres',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  production: {
    database: process.env.DB_NAME,
    dialect: 'postgres',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  }
}

export { PORT, NODE_ENV, DB, Logger, logEnv }

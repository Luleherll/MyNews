import { DB } from "../lib";
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV
const DB: DB = {
  database: process.env.DB_NAME,
  dialect: 'postgres',
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
}

export { PORT, NODE_ENV, DB }

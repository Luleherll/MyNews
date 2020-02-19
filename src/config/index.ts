import { DB } from "../lib";
import dotenv from "dotenv";
import Logger from "./winston";

dotenv.config();

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;
const logEnv = NODE_ENV === "production" ? "info" : "debug";
const JWT_ISSUER = process.env.JWT_ISSUER;
const JWT_SECRET = process.env.JWT_SECRET;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const MAIL_RETURN_URL = process.env.MAIL_RETURN_URL;
const AUTH_EMAIL = process.env.AUTH_EMAIL;
const DB: { [key: string]: DB } = {
  development: {
    database: process.env.DB_NAME,
    dialect: "postgres",
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  },
  production: {
    database: process.env.DB_NAME,
    dialect: "postgres",
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  }
};
const ONE_HOUR = (new Date().getTime() + 60 * 60 * 1000) / 1000;

export { PORT, NODE_ENV, DB, JWT_ISSUER, JWT_SECRET, Logger, logEnv, SENDGRID_API_KEY, MAIL_RETURN_URL, AUTH_EMAIL, ONE_HOUR };

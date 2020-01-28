// import { Sequelize } from "sequelize-typescript";
// import { DB, NODE_ENV } from "../config";
// import User from "./user";

// const { database, dialect, password, username } = DB;

// const sequelize = new Sequelize({
//   database,
//   dialect,
//   password,
//   username,
//   models: [User]
// });

// //TODO: Read about migrations and implement them

// const connect = () => {
//   let options = {};
//   if (NODE_ENV === "development") {
//     options = { force: true, logging: true };
//   }
//   if (NODE_ENV === "production") {
//     options = { logging: false };
//   }
//   sequelize
//     .authenticate()
//     .then(() => {
//       console.log(`Successfully connected to the ${database} `);
//       sequelize.sync(options);
//     })
//     .catch(err => console.log(`Error${err}`));
// };

// export default connect;
// 'use strict';
import * as fs from 'fs';
import * as path from 'path'
import { Sequelize } from 'sequelize';
import { NODE_ENV } from '../config';

const config = require(__dirname + '../config/config.json')[NODE_ENV];
let db = {};
const basename = path.basename(__filename);

let sequelize: Sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db = { sequelize, Sequelize };

export default db;
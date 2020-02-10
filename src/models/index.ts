import * as fs from 'fs';
import * as path from 'path'
import { Sequelize } from 'sequelize';
import { NODE_ENV } from '../config';
import con from '../config/config';

const config = con[NODE_ENV];
let db = {};
const basename = path.basename(__filename);
let sequelize: Sequelize;

if (config.useEnvVariable) {
  sequelize = new Sequelize(process.env[config.useEnvVariable], config);
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
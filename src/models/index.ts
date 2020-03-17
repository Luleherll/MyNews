import * as fs from 'fs';
import path from 'path';
import { Sequelize, Op } from 'sequelize';
import { NODE_ENV } from '../config';
import conf from '../config/config';
import { errorHandlers } from '../utils';

const config = conf[NODE_ENV];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  dialect: config.dialect,
});
errorHandlers.checkDbConnection(sequelize);
sequelize.sync({ logging: false })

// Load each model file
const models = Object.assign({}, ...fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf(".") !== 0) && (file !== "index.js" && file !== "index.ts")
  }
    
  )
  .map(function (file) {
    const model = require(path.join(__dirname, file));
    
    return {
      [model.name]: model.init(sequelize),
    };
  })
);

// Load model associations
for (const model of Object.keys(models)) {
  typeof models[model].associate === 'function' && models[model].associate(models);
}

const connection = sequelize;

export { connection, Op  }
export default models;
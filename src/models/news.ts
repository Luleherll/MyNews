"use strict";

import { MYNEWS } from "../lib/constants";

const Sequelize = require("sequelize");

class News extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.UUID,
          allowNull: false,
          autoIncrement: false,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4
        },
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        content: Sequelize.STRING,
        url: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false
        },
        urlToImage: Sequelize.STRING,
        tags: Sequelize.ARRAY(Sequelize.STRING),
        source: {
          type: Sequelize.STRING,
          defaultValue: MYNEWS
        },
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { as: 'User'});
    this.belongsToMany(models.Tag, { through: "NewsTags" });
  }

  filtered() {
    const { id, userId, createdAt, ...other} = this.dataValues;
    return {...other, publishedAt: this.dataValues.createdAt};
  }
}

export = News;

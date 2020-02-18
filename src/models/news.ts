"use strict";

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
        Author: {
          type: Sequelize.UUID,
          references: {
            model: "Users",
            key: "id"
          }
        },
        url: Sequelize.STRING,
        urlToImage: Sequelize.STRING,
        publishedAt: Sequelize.DATE,
        tags: Sequelize.ARRAY(Sequelize.STRING),
        source: Sequelize.STRING
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.belongsTo(models.User);
    this.belongsToMany(models.Tag, { through: "NewsTags" });
  }
}

export = News;

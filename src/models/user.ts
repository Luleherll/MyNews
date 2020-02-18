"use strict";

const Sequelize = require("sequelize");

class User extends Sequelize.Model {
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
        username: {
          type: Sequelize.STRING,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        photo: {
          type: Sequelize.STRING,
          allowNull: true
        },
        isAdmin: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
        verified: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        }
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.hasMany(models.News);
  }

  filtered() {
    const { id, updatedAt, createdAt, password, ...other} = this.dataValues;
    return other;
  }
}

export = User;

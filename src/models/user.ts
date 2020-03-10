"use strict";

import { Hash } from "../utils";

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
      {
        sequelize,
        hooks: {
          beforeCreate: (user) => user.password = Hash.makeHash(user.password)
        }
      }
    );
  }

  static associate(models) {
    this.hasMany(models.News);
    this.hasMany(models.RefreshToken)
  }

  validatePassword = (password: string) =>  Hash.compareHash(password, this.password);

  filtered() {
    const { id, updatedAt, createdAt, password, ...other} = this.dataValues;
    return other;
  }
}

export = User;

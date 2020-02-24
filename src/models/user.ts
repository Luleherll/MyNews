"use strict";

const Sequelize = require("sequelize");
import bcrypt from 'bcryptjs';

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
          afterValidate: (user) => {
            user.password = bcrypt.hashSync(user.password, 8);
          },
        }
      }
    );
  }

  static associate(models) {
    this.hasMany(models.News);
  }

  validatePassword(password: string) {
    console.log(this.password);
    return bcrypt.compare(password, this.password)
  }

  filtered() {
    const { id, updatedAt, createdAt, password, ...other} = this.dataValues;
    return other;
  }
}

export = User;

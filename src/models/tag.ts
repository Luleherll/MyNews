const Sequelize = require("sequelize");

class Tag extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING,
          allowNull: false
        }
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.belongsToMany(models.News, { through: "NewsTags" });
  }
}

export = Tag;

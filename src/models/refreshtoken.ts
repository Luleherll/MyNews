const Sequelize = require("sequelize");

class RefreshToken extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        value: {
          type: Sequelize.STRING,
          allowNull: false
        }
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.belongsTo(models.User);
  }
}

export = RefreshToken ;
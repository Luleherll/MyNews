'use strict';
module.exports = (sequelize, DataTypes) => {
  const News = sequelize.define('news', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    content: DataTypes.STRING,
    Author: {
      type: DataTypes.UUID,
      references: {
          model: 'Users',
          key: 'id'
        }
    },
    url: DataTypes.STRING,
    urlToImage: DataTypes.STRING,
    publishedAt: DataTypes.DATE,
    tags: DataTypes.ARRAY(DataTypes.STRING),
    source: DataTypes.STRING
  }, {});
  News.associate = function(models) {
    News.belongsTo(models.User)
    News.belongsToMany(models.Tag, { through: 'NewsTags');
  };
  return News;
};
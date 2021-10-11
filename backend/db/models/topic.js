'use strict';
module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define('Topic', {
    name: DataTypes.STRING
  }, {});
  Topic.associate = function(models) {
    Topic.hasMany(models.Questions, { foreignKey: 'topicId'})
  };
  return Topic;
};

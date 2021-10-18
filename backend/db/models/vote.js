'use strict';

const topic = require("./topic");

module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    userId: DataTypes.INTEGER,
    answerId: DataTypes.INTEGER
  }, {});
  Vote.associate = function(models) {
    Vote.belongsTo(models.Answer, { foreignKey: 'answerId' })
    Vote.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return Vote;
};

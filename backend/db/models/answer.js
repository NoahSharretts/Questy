'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    userId: DataTypes.INTEGER,
    body: DataTypes.TEXT,
    questionId: DataTypes.INTEGER
  }, {});
  Answer.associate = function(models) {
    // associations can be defined here
  };
  return Answer;
};
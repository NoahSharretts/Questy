'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    userId: DataTypes.INTEGER,
    topicId: DataTypes.INTEGER,
    body: DataTypes.TEXT
  }, {});
  Question.associate = function(models) {
    // associations can be defined here
  };
  return Question;
};
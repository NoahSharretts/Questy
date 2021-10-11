'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    userId: DataTypes.INTEGER,
    topicId: DataTypes.INTEGER,
    body: DataTypes.TEXT
  }, {});
  Question.associate = function(models) {
    Question.belongsTo(models.Users, { foreignKey: 'userId' })
    Question.belongsTo(models.Topics, { foreignKey: 'topicId' })
    Question.hasMany(models.Answers, { foreignKey: 'questionId', onDelete: 'CASCADE', hooks:true })

  };
  return Question;
};

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    userId: DataTypes.INTEGER,
    topicId: DataTypes.INTEGER,
    body: DataTypes.TEXT
  }, {});
  Question.associate = function(models) {
    Question.belongsTo(models.User, { foreignKey: 'userId' })
    Question.belongsTo(models.Topic, { foreignKey: 'topicId' })
    Question.hasMany(models.Answer, { foreignKey: 'questionId', onDelete: 'CASCADE', hooks:true })

  };
  return Question;
};

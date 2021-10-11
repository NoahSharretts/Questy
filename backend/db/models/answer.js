'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    userId: DataTypes.INTEGER,
    body: DataTypes.TEXT,
    questionId: DataTypes.INTEGER
  }, {});
  Answer.associate = function(models) {
    Answer.belongsTo(models.Question, { foreignKey: 'questionId' })
    Answer.belongsTo(models.User, { foreignKey: 'userId' })
    Answer.hasMany(models.Vote, { foreignKey: 'answerId', onDelete: 'CASCADE', hooks:true })
  };
  return Answer;
};

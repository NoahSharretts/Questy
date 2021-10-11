'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    userId: DataTypes.INTEGER,
    body: DataTypes.TEXT,
    questionId: DataTypes.INTEGER
  }, {});
  Answer.associate = function(models) {
    Answer.belongsTo(models.Users, { foreignKey: 'userId' })
    Answer.belongsTo(models.Questions, { foreignKey: 'questionId' })
  };
  return Answer;
};

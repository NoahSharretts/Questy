'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Answers', [
      {
        userId:2,
        body:'Bond is on it!',
        questionId:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId:1,
        body:"I am a dawrf and I'm digging a hole, diggy-diggy hole, I'm digging a hole!",
        questionId:2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId:3,
        body:'Consider it Shrekt!!!',
        questionId:3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Answers', null, {
      truncate: true, cascade: true, restartIdentity: true
    });
  }
};

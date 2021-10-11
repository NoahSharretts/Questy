'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Questions', [
      {
        userId: 3,
        topicId: 1,
        body: 'Can somone pick some berries for me, down by the river?',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        topicId: 5,
        body: 'Can somone mine 20 starmetal for me?',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        topicId: 10,
        body: 'Can somone slay the drangon for me in Winsward?',
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
    return queryInterface.bulkDelete('Questions', null, {
      truncate: true, cascade: true, restartIdentity: true
    });
  }
};

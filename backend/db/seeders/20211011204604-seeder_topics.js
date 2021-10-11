'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Topics', [
      {
        name: 'Lavel 1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lavel 2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lavel 3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lavel 4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lavel 5',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lavel 6',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lavel 7',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lavel 8',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lavel 9',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lavel 10',
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
   return queryInterface.bulkDelete('Topics', null, {
     truncate: true, cascade: true, restartIdentity: true
   });
  }
};

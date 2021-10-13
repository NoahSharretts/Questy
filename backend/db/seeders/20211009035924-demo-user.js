'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'jamesBond@007.com',
        username: 'Bond',
        hashedPassword: bcrypt.hashSync('milk'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'sherk@swamp.com',
        username: 'Sherk',
        hashedPassword: bcrypt.hashSync('donkey'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'Bond', 'Sherk'] }
    }, {});
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      id: '05ae7188-709a-45de-bf78-c543078e1b1c',
      username: 'John',
      email: 'caserodesk@gmail.com',
      password: '$2a$08$FwU48gAnuck2QqDZZO/B7OoPLxxKcdO.IECPSqZdPXgl7yMhyJEAW',
      isAdmin: true,
      verified: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};

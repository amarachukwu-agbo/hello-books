const bcryptjs = require('bcryptjs');

const salt = bcryptjs.genSaltSync(10);
const dotenv = require('dotenv');

dotenv.config();

const { adminPassword } = process.env;
const hash = bcryptjs.hashSync(adminPassword, salt);

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Users',
      [
        {
          id: 1,
          firstName: 'Amarachi',
          lastName: 'Agbo',
          email: 'amarachukwu.agbo@gmail.com',
          password: hash,
          role: 'Admin',
          createdAt: '2018-05-10 04:11:52.181+01',
          updatedAt: '2018-05-10 04:11:52.181+01',
        },
        {
          id: 2,
          firstName: 'Amarachi',
          lastName: 'Agbo',
          email: 'amarkipkip@gmail.com',
          password: hash,
          role: 'Admin',
          createdAt: '2018-05-10 04:11:52.181+01',
          updatedAt: '2018-05-10 04:11:52.181+01',
        },
      ], {},
    ),

  down: (queryInterface, Sequelize) => (
    queryInterface.bulkDelete('Users', null, {})
  ),
};

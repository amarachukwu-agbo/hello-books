const bcryptjs = require('bcryptjs');

const salt = bcryptjs.genSaltSync(10);
const dotenv = require('dotenv');

dotenv.config();

const { ADMIN_PASSWORD, ADMIN_EMAIL } = process.env;

const hash = bcryptjs.hashSync(ADMIN_PASSWORD, salt);

module.exports = {
  up: (queryInterface, Sequelize) => //eslint-disable-line
    queryInterface.bulkInsert(
      'Users',
      [
        {
          id: 20000,
          firstName: 'Amarachi',
          lastName: 'Agbo',
          email: ADMIN_EMAIL,
          password: hash,
          role: 'Admin',
          createdAt: '2018-05-10 04:11:52.181+01',
          updatedAt: '2018-05-10 04:11:52.181+01',
        },
      ], {},
    ),

  down: (queryInterface, Sequelize) => ( //eslint-disable-line
    queryInterface.bulkDelete('Users', null, {})
  ),
};

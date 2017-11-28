const migration = {
  up: queryInterface => queryInterface.renameColumn('Users', 'userId', 'id'),
  down: queryInterface => queryInterface.renameColumn('Books', 'userId', 'id'),
};

export default migration;

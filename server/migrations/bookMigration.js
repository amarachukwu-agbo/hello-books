const migration = {
  up: queryInterface => queryInterface.renameColumn('Books', 'bookId', 'id'),
  down: queryInterface => queryInterface.renameColumn('Books', 'bookId', 'id'),
};

export default migration;

const migration = {
  up: queryInterface => queryInterface.renameColumn('BorrowedBooks', 'borrowId', 'id'),
  down: queryInterface => queryInterface.renameColumn('BorrowedBooks', 'borrowId', 'id'),
};

export default migration;

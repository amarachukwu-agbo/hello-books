module.exports = {
  up: queryInterface => queryInterface.renameColumn('BorrowedBooks', 'borrowId', 'id'),
  down: queryInterface => queryInterface.renameColumn('BorrowedBooks', 'borrowId', 'id'),
};

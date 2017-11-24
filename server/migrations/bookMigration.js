module.exports = {
  up: queryInterface => queryInterface.renameColumn('Books', 'bookId', 'id'),
  down: queryInterface => queryInterface.renameColumn('Books', 'bookId', 'id'),
};

module.exports = {
  up: queryInterface => queryInterface.renameColumn('Reviews', 'reviewId', 'id'),
  down: queryInterface => queryInterface.renameColumn('Reviews', 'reviewId', 'id'),
};

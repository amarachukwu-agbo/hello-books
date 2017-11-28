const migration = {
  up: queryInterface => queryInterface.renameColumn('Reviews', 'reviewId', 'id'),
  down: queryInterface => queryInterface.renameColumn('Reviews', 'reviewId', 'id'),
};

export default migration;

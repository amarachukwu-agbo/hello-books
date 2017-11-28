const migration = {
  up: queryInterface =>
    queryInterface.renameColumn('Favorites', 'favId', 'id'),
  down: queryInterface => queryInterface.renameColumn('Favorites', 'favId', 'id'),
};

export default migration;

const migration = {
  up: queryInterface => queryInterface.renameColumn('ReturnRequests', 'requestId', 'id'),
  down: queryInterface => queryInterface.renameColumn('ReturnRequests', 'requestId', 'id'),
};

export default migration;

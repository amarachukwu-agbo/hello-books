module.exports = {
  up: queryInterface => queryInterface.renameColumn('ReturnRequests', 'requestId', 'id'),
  down: queryInterface => queryInterface.renameColumn('ReturnRequests', 'requestId', 'id'),
};

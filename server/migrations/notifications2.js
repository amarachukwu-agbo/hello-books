module.exports = {
  up: queryInterface =>
    queryInterface.renameColumn('Notifications', 'notificationId', 'id'),
  down: queryInterface => queryInterface.renameColumn('Notifications', 'notificationId', 'id'),
};

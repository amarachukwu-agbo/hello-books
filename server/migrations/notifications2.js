const migration = {
  up: queryInterface =>
    queryInterface.renameColumn('Notifications', 'notificationId', 'id'),
  down: queryInterface => queryInterface.renameColumn('Notifications', 'notificationId', 'id'),
};

export default migration;

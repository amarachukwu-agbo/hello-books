module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.changeColumn('BorrowRequests', 'id', {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    }),
  down: (queryInterface, Sequelize) =>
    queryInterface.changeColumn('BorrowRequests', 'id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    }),
};

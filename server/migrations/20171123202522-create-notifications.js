module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Notifications', {
      notificationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUID4,
      },
      notification: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      userId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'Users',
          key: 'userId',
          as: 'userId',
        },
      },
    }),
  down: queryInterface => queryInterface.dropTable('Notifications'),
};

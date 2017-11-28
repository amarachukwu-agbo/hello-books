const migration = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('ReturnRequests', {
      requestId: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUID4,
      },
      comments: {
        type: Sequelize.TEXT,
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
      bookId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Books',
          key: 'bookId',
          as: 'bookId',
        },
      },
    }),
  down: queryInterface => queryInterface.dropTable('ReturnRequests'),
};

export default migration;

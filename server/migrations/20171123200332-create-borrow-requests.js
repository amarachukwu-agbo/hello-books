module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('BorrowRequests', {
      requestId: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUID4,
      },
      reason: {
        type: Sequelize.ENUM,
        values: ['Research', 'Assignment', 'Leisure reading'],
        allowNull: false,
      },
      comments: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      returnDate: {
        type: Sequelize.DATE,
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
  down: queryInterface => queryInterface.dropTable('BorrowRequests'),
};

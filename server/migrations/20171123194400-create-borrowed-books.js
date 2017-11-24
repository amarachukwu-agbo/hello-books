module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('BorrowedBooks', {
      borrowId: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUID4,
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
        references: {
          model: 'Users',
          key: 'userId',
          as: 'userId',
        },
      },
      bookId: {
        type: Sequelize.UUID,
        references: {
          model: 'Books',
          key: 'bookId',
          as: 'bookId',
        },
      },
    }),
  down: queryInterface => queryInterface.dropTable('BorrowedBooks'),
};

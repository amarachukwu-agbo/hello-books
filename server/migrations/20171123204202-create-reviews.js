module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Reviews', {
      reviewId: {
        type: Sequelize.UUID,
        allowNull: false,
        foreignKey: true,
        defaultValue: Sequelize.UUID4,
      },
      review: {
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
  down: queryInterface => queryInterface.dropTable('Reviews'),
};

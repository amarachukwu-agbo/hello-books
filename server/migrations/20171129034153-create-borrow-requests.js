module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('BorrowRequests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      reason: {
        type: Sequelize.ENUM,
        values: ['Research', 'Leisure reading', 'Assignment'],
        allowNull: false,
      },
      comments: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'Pending',
        allowNull: false,
      },
      returnDate: {
        allowNull: false,
        type: Sequelize.DATE,
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
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        },
      },
      bookId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Books',
          key: 'id',
          as: 'bookId',
        },
      },
    }),
  down: (queryInterface => queryInterface.dropTable('BorrowRequests')),
};

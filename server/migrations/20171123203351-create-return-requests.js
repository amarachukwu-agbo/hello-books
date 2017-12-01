module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('ReturnRequests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      comments: {
        type: Sequelize.TEXT,
        allowNull: true,
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
        references: {
          model: 'Books',
          key: 'id',
          as: 'bookId',
        },
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Pending',
      },
    }),
  down: queryInterface => queryInterface.dropTable('ReturnRequests'),
};

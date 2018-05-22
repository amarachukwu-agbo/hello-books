module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Votes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    voteType: {
      type: Sequelize.ENUM,
      values: ['upvote', 'downvote'],
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
  down: queryInterface => queryInterface.dropTable('Votes'),
};


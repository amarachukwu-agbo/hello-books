module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      subject: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      imageURL: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      borrowCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      favCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      upvotes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      downvotes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: 0,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: 0,
      },
    }),
  down: queryInterface => queryInterface.dropTable('Books'),
};

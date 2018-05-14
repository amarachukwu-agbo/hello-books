module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'You entered an invalid email',
          },
        },
      },
      role: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['Admin', 'User'],
      },
      imageURL: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          validateFormat(imageURL) {
            if (!imageURL.match(/.\(png | jpeg | jpg | gif | png)$/)) {
              throw new Error('Image Url must be a valid url');
            }
          },
          isUrl: {
            msg: 'Image Url must be a valid url',
          },
        },
      },
      password: {
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
    }),
  down: queryInterface => queryInterface.dropTable('Users'),
};

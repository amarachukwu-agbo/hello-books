import * as Sequelize from 'sequelize';

const userSchema = (sequelize) => {
  const User = sequelize.define('User', {
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
      validate: {
        isEmail: {
          msg: 'Your email is not valid. Try again.',
        },
      },
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.ENUM,
      values: ['Admin', 'User'],
      allowNull: false,
    },
    imageURL: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });
  User.associate = (models) => {
    User.hasMany(models.Favorites, {
      foreignKey: 'userId',
      as: 'userFavorites',
    });
    User.hasMany(models.BorrowedBooks, {
      foreignKey: 'userId',
      as: 'userBooks',
    });
    User.hasMany(models.BorrowRequests, {
      foreignKey: 'userId',
      as: 'userBorrowRequests',
    });
    User.hasMany(models.ReturnRequests, {
      foreignKey: 'userId',
      as: 'userReturnRequests',
    });
    User.hasMany(models.Review, {
      foreignKey: 'userId',
      as: 'userReviews',
    });
    User.hasMany(models.Votes, {
      foreignKey: 'userId',
      as: 'userVotes',
    });
  };
  return User;
};

export default userSchema;

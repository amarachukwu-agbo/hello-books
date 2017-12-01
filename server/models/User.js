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
  });
  // 1 to many notifucations
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
    User.hasMany(models.Upvotes, {
      foreignKey: 'userId',
      as: 'userUpvotes',
    });
    User.hasMany(models.Downvotes, {
      foreignKey: 'userId',
      as: 'userDownvotes',
    });
  };
  return User;
};

export default userSchema;

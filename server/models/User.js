import * as Sequelize from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: uuidv4(),
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
    User.hasMany(models.Notification, {
      foreignKey: 'userId',
      as: 'userNotifications',
    });
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
  };
  return User;
};

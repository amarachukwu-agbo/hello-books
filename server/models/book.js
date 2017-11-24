const uuidv4 = require('uuid/v4');
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Book = sequelize.define('Book', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: uuidv4(),
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
      allowNull: true,
      defaultValue: 0,
    },
    favCount: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    upvotes: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    downvotes: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
  });
  Book.associate = (models) => {
    Book.hasMany(models.Review, {
      foreignKey: 'id',
      as: 'bookReviews',
    });
    Book.hasMany(models.BorrowedBooks, {
      foreignKey: 'id',
      as: 'borrowedBooks',
    });
    Book.hasMany(models.BorrowRequests, {
      foreignKey: 'id',
      as: 'borrowRequests',
    });
    Book.hasMany(models.ReturnRequests, {
      foreignKey: 'id',
      as: 'returnRequests',
    });
    Book.hasMany(models.Favorites, {
      foreignKey: 'id',
      as: 'favBook',
    });
  };
  return Book;
};



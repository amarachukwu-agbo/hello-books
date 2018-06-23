const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Book = sequelize.define('Book', {
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
      foreignKey: 'bookId',
      as: 'bookReviews',
      onDelete: 'cascade',
      hooks: true,
    });
    Book.hasMany(models.Favorites, {
      foreignKey: 'bookId',
      as: 'favBook',
      onDelete: 'cascade',
      hooks: true,
    });
    Book.hasMany(models.Votes, {
      foreignKey: 'bookId',
      as: 'bookVotes',
      onDelete: 'cascade',
      hooks: true,
    });
    Book.hasMany(models.BorrowedBooks, {
      foreignKey: 'bookId',
      as: 'borrowedBooks',
      onDelete: 'cascade',
      hooks: true,
    });
    Book.hasMany(models.BorrowRequests, {
      foreignKey: 'bookId',
      as: 'borrowRequests',
      onDelete: 'cascade',
      hooks: true,
    });
    Book.hasMany(models.ReturnRequests, {
      foreignKey: 'bookId',
      as: 'returnRequests',
      onDelete: 'cascade',
      hooks: true,
    });
  };
  return Book;
};

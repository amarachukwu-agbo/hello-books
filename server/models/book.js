import * as Sequelize from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

const bookSchema = (sequelize) => {
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
      foreignKey: 'bookId',
      as: 'bookReviews',
    });
    Book.hasMany(models.BorrowedBooks, {
      foreignKey: 'bookId',
      as: 'borrowedBooks',
    });
    Book.hasMany(models.BorrowRequests, {
      foreignKey: 'bookId',
      as: 'borrowRequests',
    });
    Book.hasMany(models.ReturnRequests, {
      foreignKey: 'bookId',
      as: 'returnRequests',
    });
    Book.hasMany(models.Favorites, {
      foreignKey: 'bookId',
      as: 'favBook',
    });
    Book.hasMany(models.Upvotes, {
      foreignKey: 'bookId',
      as: 'bookUpvotes',
    });
    Book.hasMany(models.Downvotes, {
      foreignKey: 'bookId',
      as: 'bookDownvotes',
    });
  };
  return Book;
};
export default bookSchema;

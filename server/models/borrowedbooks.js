const uuidv4 = require('uuid/v4');
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const BorrowedBooks = sequelize.define('BorrowedBooks', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: uuidv4(),
    },
  });
  BorrowedBooks.associate = (models) => {
    BorrowedBooks.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'userBooks',
      onDelete: 'CASCADE',
    });
    BorrowedBooks.belongsTo(models.Book, {
      foreignKey: 'bookId',
      as: 'borrowedBooks',
    });
  };
  return BorrowedBooks;
};



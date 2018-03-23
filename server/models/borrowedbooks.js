import * as Sequelize from 'sequelize';

const borrowedBookSchema = (sequelize) => {
  const BorrowedBooks = sequelize.define('BorrowedBooks', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.ENUM,
      allowNull: false,
      values: ['Returned', 'Not returned'],
      defaultValue: 'Not returned',
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
      onDelete: 'CASCADE',
    });
  };
  return BorrowedBooks;
};
export default borrowedBookSchema;

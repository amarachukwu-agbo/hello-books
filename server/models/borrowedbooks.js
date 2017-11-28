import * as Sequelize from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

const borrowedBookSchema = (sequelize) => {
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
export default borrowedBookSchema;

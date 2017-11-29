import * as Sequelize from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

const borrowRequestSchema = (sequelize) => {
  const BorrowRequests = sequelize.define('BorrowRequests', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: uuidv4(),
    },
    reason: {
      type: Sequelize.ENUM,
      values: ['Research', 'Assignment', 'Leisure reading'],
      allowNull: false,
    },
    comments: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    returnDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      defaultValue: 'Pending',
      allowNull: false,
    },
  });
  BorrowRequests.associate = (models) => {
    BorrowRequests.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'userBorrowRequests',
      onDelete: 'CASCADE',
    });
    BorrowRequests.belongsTo(models.Book, {
      foreignKey: 'bookId',
      as: 'borrowRequests',
    });
  };
  return BorrowRequests;
};

export default borrowRequestSchema;

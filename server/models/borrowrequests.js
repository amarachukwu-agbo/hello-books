import * as Sequelize from 'sequelize';

const borrowRequestSchema = (sequelize) => {
  const BorrowRequests = sequelize.define('BorrowRequests', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    reason: {
      type: Sequelize.ENUM,
      values: ['Research', 'Assignment', 'Leisure reading'],
      allowNull: false,
    },
    comments: {
      type: Sequelize.TEXT,
      allowNull: true,
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
      onDelete: 'CASCADE',
    });
  };
  return BorrowRequests;
};

export default borrowRequestSchema;

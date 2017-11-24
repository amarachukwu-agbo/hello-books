const Sequelize = require('sequelize');
const uuidv4 = require('uuid/v4');

module.exports = (sequelize) => {
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



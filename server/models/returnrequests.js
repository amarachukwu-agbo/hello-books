import * as Sequelize from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

module.exports = (sequelize) => {
  const ReturnRequests = sequelize.define('ReturnRequests', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: uuidv4(),
    },
    comments: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  });
  ReturnRequests.associate = (models) => {
    ReturnRequests.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'userReturnRequests',
      onDelete: 'CASCADE',
    });
    ReturnRequests.belongsTo(models.Book, {
      foreignKey: 'bookId',
      as: 'returnRequests',
    });
  };
  return ReturnRequests;
};

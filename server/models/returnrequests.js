import * as Sequelize from 'sequelize';

const returnRequestSchema = (sequelize) => {
  const ReturnRequests = sequelize.define('ReturnRequests', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    comments: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Pending',
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

export default returnRequestSchema;

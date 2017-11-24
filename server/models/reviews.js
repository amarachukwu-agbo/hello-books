import * as Sequelize from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

module.exports = (sequelize) => {
  const Review = sequelize.define('Review', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: uuidv4(),
    },
    review: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  Review.associate = (models) => {
    Review.belongsTo(models.Book, {
      foreignKey: 'bookId',
      as: 'bookReviews',
      onDelete: 'CASCADE',
    });
    Review.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'userReviews',
      onDelete: 'CASCADE',
    });
  };
  return Review;
};

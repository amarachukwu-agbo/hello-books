import * as Sequelize from 'sequelize';

const reviewSchema = (sequelize) => {
  const Review = sequelize.define('Review', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
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

export default reviewSchema;

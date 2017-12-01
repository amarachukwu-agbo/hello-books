import * as Sequelize from 'sequelize';

const upVoteSchema = (sequelize) => {
  const Upvotes = sequelize.define('Upvotes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
  });
  Upvotes.associate = (models) => {
    Upvotes.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      as: 'userUpvotes',
    });
    Upvotes.belongsTo(models.Book, {
      foreignKey: 'bookId',
      onDelete: 'CASCADE',
      as: 'bookUpvotes',
    });
  };
  return Upvotes;
};

export default upVoteSchema;

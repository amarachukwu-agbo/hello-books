import * as Sequelize from 'sequelize';

const downVoteSchema = (sequelize) => {
  const Downvotes = sequelize.define('Downvotes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
  });
  Downvotes.associate = (models) => {
    Downvotes.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      as: 'userDownvotes',
    });
    Downvotes.belongsTo(models.Book, {
      foreignKey: 'bookId',
      onDelete: 'CASCADE',
      as: 'bookDownvotes',
    });
  };
  return Downvotes;
};

export default downVoteSchema;

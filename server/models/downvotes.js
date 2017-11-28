import * as Sequelize from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

const downVoteSchema = (sequelize) => {
  const Downvotes = sequelize.define('Downvotes', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: uuidv4(),
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

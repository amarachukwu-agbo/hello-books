import * as Sequelize from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

module.exports = (sequelize) => {
  const Upvotes = sequelize.define('Upvotes', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: uuidv4(),
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

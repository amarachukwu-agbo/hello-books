import * as Sequelize from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

module.exports = (sequelize) => {
  const Favorites = sequelize.define('Favorites', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: uuidv4(),
    },
  });
  Favorites.associate = (models) => {
    Favorites.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      as: 'userFavorites',
    });
    Favorites.belongsTo(models.Book, {
      foreignKey: 'bookId',
      as: 'favBook',
    });
  };
  return Favorites;
};

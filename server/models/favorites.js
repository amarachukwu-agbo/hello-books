import * as Sequelize from 'sequelize';

const favoriteSchema = (sequelize) => {
  const Favorites = sequelize.define('Favorites', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
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
      onDelete: 'CASCADE',
    });
  };
  return Favorites;
};

export default favoriteSchema;

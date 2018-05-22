import * as Sequelize from 'sequelize';

const notificationsSchema = (sequelize) => {
  const Notifications = sequelize.define('Notifications', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    notification: {
      type: Sequelize.STRING,
    },
  });
  Notifications.associate = (models) => {
    Notifications.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      as: 'userNotifications',
    });
  };
  return Notifications;
};

export default notificationsSchema;

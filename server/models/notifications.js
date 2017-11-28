import * as Sequelize from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

const notificationSchema = (sequelize) => {
  const Notification = sequelize.define('Notification', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: uuidv4(),
    },
    notification: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  Notification.associate = (models) => {
    Notification.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      as: 'userNotifications',
    });
  };
  return Notification;
};

export default notificationSchema;

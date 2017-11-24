const Sequelize = require('sequelize');
const uuidv4 = require('uuid/v4');

module.exports = (sequelize) => {
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

import * as Sequelize from 'sequelize';

const votesSchema = (sequelize) => {
  const Votes = sequelize.define('Votes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    voteType: {
      type: Sequelize.ENUM,
      values: ['upvote', 'downvote'],
    },
  });
  Votes.associate = (models) => {
    Votes.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      as: 'userVotes',
    });
    Votes.belongsTo(models.Book, {
      foreignKey: 'bookId',
      onDelete: 'CASCADE',
      as: 'bookVotes',
    });
  };
  return Votes;
};

export default votesSchema;

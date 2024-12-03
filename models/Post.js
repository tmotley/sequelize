'use strict';
const { Model, Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {}
  Post.init({
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    author: {
      type: DataTypes.STRING,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    title: DataTypes.STRING,
    body: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'posts',
    timestamps: false
  });

  const User = require('./User')(sequelize, DataTypes);
  Post.belongsTo(User, { foreignKey: 'author', as: 'blogAuthor' });
  return Post;
};
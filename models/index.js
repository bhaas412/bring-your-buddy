const User = require('./User');
const Review = require('./Review');

// User can post many reviews
User.hasMany(Review, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// A review belongs to a user
Review.belongsTo(User, {
  foreignKey: 'user_id'
});

// TODO: Additional tables for comments, etc.?

module.exports = { User, Review };

const Comment = require('./Comment');
const Review = require('./Review');
const User = require('./User');
const Location = require('./Location');

// User associations

User.hasMany(Review, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// Review associations

Review.belongsTo(User, {
    foreignKey: 'user_id'
});

Review.belongsTo(Location, {
    foreignKey: 'location_id'
});

Review.hasMany(Comment, {
    foreignKey: 'review_id',
    onDelete: 'CASCADE'
});

// Location associations

Location.hasMany(Review, {
    foreignKey: 'location_id',
    onDelete: 'CASCADE'
});

// Comment associations

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Review, {
    foreignKey: 'review_id'
});

module.exports = { Comment, Review, User , Location };
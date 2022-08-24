const Comment = require('./Comment');
const Review = require('./Review');
const User = require('./User');
// const Location = require('./Location');

User.hasMany(Review, {
    foreignKey: 'user_id'
});

Review.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Review, {
    foreignKey: 'review_id',
    onDelete: 'cascade'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Review.hasMany(Comment, {
    foreignKey: 'review_id'
});

module.exports = { Comment, Review, User };
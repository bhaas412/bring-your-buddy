const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');
const Location = require('./Location');

User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'cascade'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

User.hasMany(Campground, {
    foreignKey: 'user_id'
});

Campground.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { Comment, Post, User, Campground };

const router = require('express').Router();

const userRoutes = require('./userRoutes.js');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');
const locationRoutes = require('./locationRoutes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/locations', locationRoutes)

module.exports = router;

const router = require('express').Router();

const userRoutes = require('./userRoutes.js');
const postRoutes = require('./reviewRoutes');
const commentRoutes = require('./commentRoutes');
const locationRoutes = require('./locationRoutes');

router.use('/users', userRoutes);
router.use('/reviews', reviewRoutes);
router.use('/comments', commentRoutes);
router.use('/locations', locationRoutes)

module.exports = router;
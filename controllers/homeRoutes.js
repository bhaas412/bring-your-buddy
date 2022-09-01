const router = require('express').Router();
const { Review, User , Location, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Render all reviews to homepage
// Does not require authentication, will need authentication to post a review/comment
router.get('/', async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Location,
          attributes: ['location_name']
        }
      ]
    });

    const reviews = reviewData.map((review) => review.get({ plain: true }));

    // Pass reviews
    res.render('homepage', { reviews })
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})


// TODO: Get all reviews for the searched location, render review data to search.homepage
router.get('/search', (req, res) => {})

// TODO: Get all reviews for location (click on location)
router.get('/location/:id', (req, res) => {})

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;

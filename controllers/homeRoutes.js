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
          attributes: [
            'location_name',
          ]
        },
        {
          model: Comment,
          attributes: [
              'id',
              'comment_text',
              'review_id',
              'user_id',
              'created_at'
          ],
          include: {
              model: User,
              attributes: ['name']
          }
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

// Get all 
// TODO: Get all reviews for the searched location name, render review data to search.homepage
router.get('/searchLocation', async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      where: {
        location_name: req.body.location_name
      },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Location,
          attributes: [
            'location_name',
            'id']
        },
        {
          model: Comment,
          attributes: [
              'id',
              'comment_text',
              'review_id',
              'user_id',
              'created_at'
          ],
          include: {
              model: User,
              attributes: ['name']
          }
        }
      ]
      });

      const reviews = reviewData.map((review) => review.get({ plain: true }));

    // Pass reviews
    res.render('search', { reviews })
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

// TODO: Get all reviews for location id (client clicking on location sends GET request to this URL)
router.get('/locations/:id', async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      where: {
        location_id: req.params.id
      },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Location,
          attributes: [
            'location_name',
            'id']
        },
        {
          model: Comment,
          attributes: [
              'id',
              'comment_text',
              'review_id',
              'user_id',
              'created_at'
          ],
          include: {
              model: User,
              attributes: ['name']
          }
        }
      ]
      });

      const reviews = reviewData.map((review) => review.get({ plain: true }));

    // Pass reviews
    res.render('search', { reviews })
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;

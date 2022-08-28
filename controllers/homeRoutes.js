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


// TODO: Profile page endpoint
// Use withAuth middleware to prevent access to route
// router.get('/profile', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Review }],
//     });

//     const user = userData.get({ plain: true });

//     res.render('profile', {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;

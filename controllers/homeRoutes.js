const router = require('express').Router();
const { Review, User , Location, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const reviewData = await Review.findAll();
    const reviews = reviewData.map((review) => review.get({ plain: true }));

    const locationData = 

    res.render('homepage', { reviews })
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

// router.get('/', async (req, res) => {
//   try {
//     const userData = await User.findOne({
//       where: {
//         id: req.session.user_id
//     },
//     attributes: { exclude: ['password']},
//     include: [
//         {
//             model: Review,
//             attributes: [
//                 'id',
//                 'review_title',
//                 'review_text',
//                 'date_created',
//                 'pet_type',
//             ],
//             include: [
//                 {
//                     model: User,
//                     attributes: ['name']
//                 },
//                 {
//                   model: Location,
//                   attributes: [
//                       'id',
//                       'location_name',
//                       'location_type',
//                       'location_address',
//                       'pet_type',
//                   ],
//                 },                
//                 {
//                   model: Comment,
//                   attributes: [
//                       'id',
//                       'comment_text',
//                       'post_id',
//                       'user_id',
//                       'created_at',
//                   ],
//                   include: {
//                       model: User,
//                       attributes: ['name']
//                   }
//                 }
//             ]
//         },
        
//     ]
//     })

//     let userInfo = userData.get({ plain: true });
//     res.render('homepage', { userInfo });
//   }
//   catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;

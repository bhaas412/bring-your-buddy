const router = require('express').Router();
const { Review, User, Comment , Location} = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// Get all reviews
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
// router.get('/', (req, res) => {
//     Review.findAll({
//         attributes: [
//             'id',
//             'review_title',
//             'review_text',
//             'date_created',
//             'pet_type'
//         ],
//         include: [
//             { 
//                 model: User,
//                 attributes: ['name'] 
//             },
//             {
//                 model: Comment,
//                 attributes: [
//                     'id',
//                     'comment_text',
//                     'user_id',
//                     'review_id',
//                     'created_at'
//                 ],
//                 include: {
//                     model: User,
//                     attributes: ['name']
//                 }
//             }
//         ],
//         order: [['created_at', 'DESC']]
//     })
//     .then(data => res.json(data))
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// });


// Get single review
router.get('/:id', (req, res) => {
    Review.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'review_body',
            'created_at'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
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
                    attributes: ['username']
                }
            }
        ]
    })
    .then(data => {
        if (!data) {
            res.status(404).json({ message: 'No review found with this id number!' });
            return;
        }
        res.json(data);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Create a review
router.post('/', withAuth, (req, res) => {
    Review.create(req.body)
    .then(data => res.json(data))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Edit personal review
router.post('/:id', withAuth, (req, res) => {
    Review.update(
        {
            title: req.body.title,
            review_body: req.body.review_body
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(data => {
        if (!data) {
            res.status(404).json({ message: 'No review found with this id number! '});
            return;
        }
        res.json(data);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Delete review 
router.delete('/:id', withAuth, (req, res) => {
    Review.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(data => {
        if (!data) {
            res.status(404).json({ message: 'No review found with this id number!' });
            return;
        }
        res.json(data);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
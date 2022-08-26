const router = require('express').Router();
const { Review, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// route to all reviews
router.get('/', (req, res) => {
    Review.findAll({
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
        ],
        order: [['created_at', 'DESC']]
    })
    .then(data => res.json(data))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// retrieve single review
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

// create reviews
router.post('/', withAuth, (req, res) => {
    Review.create(create(req.body))
    .then(data => res.json(data))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// edit personal review
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

// delete review 
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
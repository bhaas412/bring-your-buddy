const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// route to all reviews
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'post_body',
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
                    'post_id',
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
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'post_body',
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
                    'post_id',
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
    Post.create({
        title: req.body.title,
        post_body: req.body.post_body,
        user_id: req.session.user_id
    })
    .then(data => res.json(data))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// edit personal review
router.put('/:id', withAuth, (req, res) => {
    Post.update(
        {
            title: req.body.title,
            post_body: req.body.post_body
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
    Post.destroy({
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
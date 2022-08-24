const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment, Location } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    User.findOne({
        where: {
            id: req.session.user_id
        },
        attributes: { exclude: ['password']},
        include: [
            {
                model: Post,
                attributes: [
                    'id',
                    'title',
                    'post_body',
                    'created_at',
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
            },
            {
                model: Location,
                attributes: [
                    'id',
                    'location_name',
                    'location',
                    'user_id'
                ],
            }
        ]
    })
    .then(userData => {
        let userInfo = userData.get({ plain: true });
        res.render('dashboard', { userInfo, loggedIn: true });
    })

    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

// get single post to edit
router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'post_body',
            'created_at',
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
            const post = data.get({ plain: true });
            res.render('edit-post', { post, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
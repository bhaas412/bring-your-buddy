const router = require('express').Router();
const { Location } = require('../../models');
const fetch = require('node-fetch');

const withAuth = require('../../utils/auth');

require('dotenv').config();

// retrieve all locations from the api
router.get('/', (req, res) => {
        fetch(' 
        // insert API Key here
        ' + process.env.DB_APIKEY, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        }).then(res => {
            return res.json();
        }).then(data => res.json(data))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// create reviews
router.post('/', withAuth, (req, res) => {
    Location.create({
        location_name: req.body.location_name,
        location: req.body.location,
        user_id: req.session.user_id
    })
    .then(data => res.json(data))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;
const router = require('express').Router();
const { Location } = require('../../models');
const fetch = require('node-fetch');

const withAuth = require('../../utils/auth');

require('dotenv').config();

// Get all locations
router.get('/', (req, res) => {
    Locations.findAll({})
    .then(data => res.json(data))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Get a location

// Add a location

// Delete a location

// // TODO: Stretch goal - third-party API

// // retrieve all locations from the api
// router.get('/', (req, res) => {
//         fetch(' 
//         // insert API Key here
//         ' + process.env.DB_APIKEY, {
//             method: 'GET',
//             headers: {
//                 'Accept': 'application/json'
//             }
//         }).then(res => {
//             return res.json();
//         }).then(data => res.json(data))
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });



// // Get all locations
// router.get('/', async (req, res) => {
//     try {
//       const reviewData = await Location.findAll({
//         include: [
//           {
//             model: User,
//             attributes: ['name'],
//           },
//           {
//             model: Location,
//             attributes: ['location_name']
//           }
//         ]
//       });
  
//       const reviews = reviewData.map((review) => review.get({ plain: true }));
  
//       // Pass reviews
//       res.render('homepage', { reviews })
//     }
//     catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//     }
//   })

// Add a location
router.post('/', withAuth, (req, res) => {
    Location.create({
        location_name: req.body.location_name,
        location_type: req.body.location_type,
        location_address: req.body.location_address,
        pet_type: req.body.pet_type
    })
    .then(data => res.json(data))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
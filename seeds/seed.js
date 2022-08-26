const sequelize = require('../config/connection');
const { User, Review, Location } = require('../models');

const userData = require('./userData.json');
const reviewData = require('./reviewData.json');
const locationData = require('./locationData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Seed User table
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // Seed Location table
  const locations = await Location.bulkCreate(locationData, {
    returning: true,
  });

  // Seed Review table
  for (const review of reviewData) {
    await Review.create({
      ...review,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      location_id: locations[Math.floor(Math.random() * locations.length)].id
    });
  }

  process.exit(0);
};

seedDatabase();
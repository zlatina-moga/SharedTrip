const Trip = require('../models/Trip');

async function getAllTrips() {
    return await Trip.find({}).lean()
}

module.exports = {
    getAllTrips
}
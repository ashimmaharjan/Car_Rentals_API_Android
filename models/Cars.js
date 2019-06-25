const mongoose = require('mongoose');

const Cars = mongoose.model('Cars', {
    carName: {
        type: String
    },
    carMan: {
        type: String
    },
    carAC_Status: {
        type: String
    },
    carSeats: {
        type: String
    },
    carMileage: {
        type: String
    },
    carRentalPrice: {
        type: String
    },
    carImageName: {
        type: String
    }
})

module.exports = Cars
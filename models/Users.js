const mongoose = require('mongoose');

const User = mongoose.model('User',
    {
        first_name: {
            type: String
        },
        last_name: {
            type: String
        },
        email: {
            type: String
        },
        username: {
            type: String
        },
        password: {
            type: String
        },
        phone_number: {
            type: String
        }


    })

module.exports = User;
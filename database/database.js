const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Car_Rentals_Android',
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })

console.log("Connected to Server successfully")
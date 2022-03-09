const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: false,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: false,
        max: 1024,
        min: 6
    },
    seatNumber: {
        type: Number,
        required: false,
        min: 1,
        max: 40
    },
    passengerPhone: {
        type: Number,
        required: false
    },
    passengerName: {
        type: String,
        required: false,
        min: 6,
        max: 50
    },
    passengerAge: {
        type: Number,
        required: false,
        min: 18,
        max: 150
    }
});

module.exports = mongoose.model('User', userSchema);
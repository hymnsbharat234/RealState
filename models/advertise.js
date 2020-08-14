const mongoose = require('mongoose');

const AdvertiseSchema = mongoose.Schema({

        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true

        },
        subject: {
            type: String,
            required: true

        },
        message: {
            type: String,
            required: true

        },
        phone: {
            type: Number,
            required: true

        },
        type:{
            type: String
        }
    }, {
        timestamps: true
    }

);

const Advertise = mongoose.model('Advertise', AdvertiseSchema);
module.exports = Advertise;
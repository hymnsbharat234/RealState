const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    password: {
        type : String,
        required : true
    },

    userId:{
        type : String,
        required : true

    }
},
    {
        timestamps :true
    }

);

const User = mongoose.model('User',userSchema);
module.exports = User;
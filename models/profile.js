const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({

    name: {
        type : String,
       
    },

    email:{
        type : String
    },

    phone:{
        type:Number
    },

    message:{
        type:String
    }

},
    {
        timestamps :true
    }

);

const Profile = mongoose.model('Profile',profileSchema);
module.exports = Profile;
const mongoose = require('mongoose');

const propertySchema = mongoose.Schema({

    address: {
        type : String,
    },

    price:{
        type : String

    },
    description:{
        type : String

    },
    area:{
        type : String

    },
    image:{
        type:String
    }
},
    {
        timestamps :true
    }

);

const Property = mongoose.model('Property',propertySchema);
module.exports = Property;
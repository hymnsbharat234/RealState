const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/assets/uploads/users/avatars');
const ROOT_PATH = path.join('/uploads/users/avatars');

const propertySchema = mongoose.Schema({
        city: {
            type: String
        },
        state: {
            type: String
        },
        premium :{
            type:Boolean
        },
        pin: {
            type: Number
        },
        type: {
            type: String
        },
        for: {
            type: String
        },
        rooms: {
            type: String
        },
        amenities: [{
            type: String
        }],

        address: {
            type: String,
        },

        price: {
            type: String

        },
        description: {
            type: String

        },
        area: {
            type: String

        },
        avatar: [{
            type: String
        }],
    }, {
        timestamps: true
    }

);

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

//static function
propertySchema.statics.uploadedAvatar = multer({ storage: storage }).array('avatar', 100);
propertySchema.statics.avatarPath = AVATAR_PATH;
propertySchema.statics.rootPath = ROOT_PATH;
const Property = mongoose.model('Property', propertySchema);
module.exports = Property;
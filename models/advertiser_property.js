const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/assets/uploads/advertiser/avatars');
const ROOT_PATH = path.join('/uploads/advertiser/avatars');

const advertisePropertySchema = mongoose.Schema({
        city: {
            type: String
        },
        premium :{
            type:Boolean
        },
        state: {
            type: String
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
advertisePropertySchema.statics.uploadedAvatar = multer({ storage: storage }).array('avatar', 100);
advertisePropertySchema.statics.avatarPath = AVATAR_PATH;
advertisePropertySchema.statics.rootPath = ROOT_PATH;
const Advertisement = mongoose.model('Advertisement', advertisePropertySchema);
module.exports = Advertisement;
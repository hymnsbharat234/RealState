const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/assets/uploads/machine/avatars');
const ROOT_PATH = path.join('/uploads/machine/avatars');

const MachineSchema = mongoose.Schema({
        city: {
            type: String
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


        address: {
            type: String,
        },

        price: {
            type: String

        },
        description: {
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
MachineSchema.statics.uploadedAvatar = multer({ storage: storage }).array('avatar', 100);
MachineSchema.statics.avatarPath = AVATAR_PATH;
MachineSchema.statics.rootPath = ROOT_PATH;
const Machine = mongoose.model('Machine', MachineSchema);
module.exports = Machine;
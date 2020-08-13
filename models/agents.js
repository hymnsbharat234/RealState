const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/assets/uploads/agents/avatars');
const ROOT_PATH = path.join('/uploads/agents/avatars');

const AgentsSchema = mongoose.Schema({

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
        facebook: {
            type: String,
            required: true
        },
        twitter: {
            type: String

        },
        instagram: {
            type: String

        },


        phone: {
            type: Number,
            required: true

        },
        avatar: {
            type: String
        }
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
AgentsSchema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');
AgentsSchema.statics.avatarPath = AVATAR_PATH;
AgentsSchema.statics.rootPath = ROOT_PATH;

const Agents = mongoose.model('Agents', AgentsSchema);
module.exports = Agents;
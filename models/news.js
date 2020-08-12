const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/assets/uploads/news/avatars');
const ROOT_PATH = path.join('/uploads/news/avatars');

const newsSchema = mongoose.Schema({
        type: {
            type: String
        },
        for: {
            type: String
        },
        title: {
            type: String

        },
        news: {
            type: String

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
newsSchema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');
newsSchema.statics.avatarPath = AVATAR_PATH;
newsSchema.statics.rootPath = ROOT_PATH;
const News = mongoose.model('News', newsSchema);
module.exports = News;
const User = require('../models/user');
const Property = require('../models/property');
const Machine = require('../models/machine');
const Advertise = require('../models/advertise');
const Advertiser = require('../models/advertiser_property');
const Advertisement = require('../models/advertiser_property');

module.exports.create = function(req, res) {
    User.findOne({ userId: 'admin' }, function(err, user) {
        if (err) {
            console.log('Error in finding user in signup');
            return;
        }
        if (!user) {
            User.create(req.body, function(err, user) {
                if (err) {
                    console.log('Error in creating account in signup');
                    return;
                }
                return res.redirect('back');
            });
        } else {
            return res.redirect('/admin');
        }
    });
}



module.exports.destroySession = function(req, res) {
    req.logout();

    return res.redirect('/');
}

module.exports.addProperty = function(req, res) {

    Property.uploadedAvatar(req, res, async function(err) {
        if (err) {
            console.log('Multer Error', err);
            return;
        }
        let property = await Property.create({
            type: req.body.type,
            for: req.body.for,
            rooms: req.body.rooms,
            address: req.body.address,
            price: req.body.price,
            description: req.body.description,
            area: req.body.area,
            city: req.body.city,
            state: req.body.state,
            pin: req.body.pin

        });
        if (typeof(req.body.amenities) == 'object') {
            for (var i = 0; i < req.body.amenities.length; i++) {
                property.amenities.push(req.body.amenities[i]);
            }
        } else {
            property.amenities.push(req.body.amenities)
        }
        for (var i = 0; i < req.files.length; i++) {
            let newPath = Property.rootPath + '/' + req.files[i].filename;
            property.avatar.push(newPath);
        }
        property.save();
        req.flash('success', 'Property Added Successfully');
        return res.redirect('back');

    });

}
module.exports.addAdvertiser = function(req, res) {

    Advertisement.uploadedAvatar(req, res, async function(err) {
        if (err) {
            console.log('Multer Error', err);
            return;
        }
        let advertiser = await Advertisement.create({
            type: req.body.type,
            for: req.body.for,
            rooms: req.body.rooms,
            address: req.body.address,
            price: req.body.price,
            description: req.body.description,
            area: req.body.area,
            city: req.body.city,
            state: req.body.state,
            pin: req.body.pin

        });
        if (typeof(req.body.amenities) == 'object') {
            for (var i = 0; i < req.body.amenities.length; i++) {
                advertiser.amenities.push(req.body.amenities[i]);
            }
        } else {
            advertiser.amenities.push(req.body.amenities)
        }
        for (var i = 0; i < req.files.length; i++) {
            let newPath = Advertisement.rootPath + '/' + req.files[i].filename;
            advertiser.avatar.push(newPath);
        }
        advertiser.save();
        req.flash('success', 'Advertiser Property Added Successfully');
        return res.redirect('back');

    });

}

module.exports.addMachinery = function(req, res) {

    Machine.uploadedAvatar(req, res, async function(err) {
        if (err) {
            console.log('Multer Error', err);
            return;
        }
        let machine = await Machine.create({
            type: req.body.type,
            for: req.body.for,
            address: req.body.address,
            price: req.body.price,
            description: req.body.description,
            city: req.body.city,
            state: req.body.state,
            pin: req.body.pin

        });

        for (var i = 0; i < req.files.length; i++) {
            let newPath = Machine.rootPath + '/' + req.files[i].filename;
            machine.avatar.push(newPath);
        }
        machine.save();
        req.flash('success', 'Machine Added Successfully');
        return res.redirect('back');

    });

}

module.exports.deleteProperty = async function(req, res) {

    let property = await Property.deleteOne({ _id: req.query.id });
    return res.redirect('back');

}

module.exports.deleteMachinery = async function(req, res) {

    let machine = await Machine.deleteOne({ _id: req.query.id });
    return res.redirect('back');

}
module.exports.deleteAdvertisement = async function(req, res) {

    let machine = await Advertise.deleteOne({ _id: req.query.id });
    return res.redirect('back');

}
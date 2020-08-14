const User = require('../models/user');
const Property = require('../models/property');
const Machine = require('../models/machine');
const Advertise = require('../models/advertise');
const Advertisement = require('../models/advertiser_property');
const News = require('../models/news');
const fs = require('fs');
const path = require('path');

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
            pin: req.body.pin,
            premium:false

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
module.exports.addNews = function(req, res) {

    News.uploadedAvatar(req, res, async function(err) {
        if (err) {
            console.log('Multer Error', err);
            return;
        }
        let news = await News.create({
            type: req.body.type,
            for: req.body.for,
            title:req.body.title,
            news:req.body.news

        });
       
        let newPath = News.rootPath + '/' + req.file.filename;
        news.avatar = newPath;
        
        news.save();
        req.flash('success', 'News Added Successfully');
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
            pin: req.body.pin,
            premium:true

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

   
    let property = await Property.findOne({_id: req.query.id});
    if (property.avatar.length>1) {
        for(pro of property.avatar)
        {
            // console.log(path.join(__dirname,'..','\assets',pro))
            fs.unlinkSync(path.join(__dirname,'..','\assets',pro));
        }
    } else {
        fs.unlinkSync(path.join(__dirname,'..','\assets',property.avatar[0]));
        // console.log(path.join(__dirname,'..','\assets',property.avatar[0]))
    }
    let prope = await Property.deleteOne({ _id: req.query.id });
   
    req.flash('success', 'Property removed Successfully');
    return res.redirect('back');

}

module.exports.deleteNews = async function(req, res) {


    
    let property = await News.findOne({_id: req.query.id});
    fs.unlinkSync(path.join(__dirname,'..','\assets',property.avatar));

    let prop = await News.deleteOne({ _id: req.query.id });
    req.flash('success', 'News removed Successfully');
    return res.redirect('back');

}

module.exports.deleteMachinery = async function(req, res) {
    let property = await Machine.findOne({_id: req.query.id});
    if (property.avatar.length>1) {
        for(pro of property.avatar)
        {
            // console.log(path.join(__dirname,'..','\assets',pro))
            fs.unlinkSync(path.join(__dirname,'..','\assets',pro));
        }
    } else {
        fs.unlinkSync(path.join(__dirname,'..','\assets',property.avatar[0]));
        // console.log(path.join(__dirname,'..','\assets',property.avatar[0]))
    }

    let machine = await Machine.deleteOne({ _id: req.query.id });
    req.flash('success', 'Machinery removed Successfully');
    return res.redirect('back');

}

module.exports.deleteAdvertiserProperty = async function(req, res) {
    let property = await Advertisement.findOne({_id: req.query.id});
    if (property.avatar.length>1) {
        for(pro of property.avatar)
        {
            // console.log(path.join(__dirname,'..','\assets',pro))
            fs.unlinkSync(path.join(__dirname,'..','\assets',pro));
        }
    } else {
        fs.unlinkSync(path.join(__dirname,'..','\assets',property.avatar[0]));
        // console.log(path.join(__dirname,'..','\assets',property.avatar[0]))
    }

    let machine = await Advertisement.deleteOne({ _id: req.query.id });
    req.flash('success', 'Advertiser Property removed Successfully');
    return res.redirect('back');

}
module.exports.deleteAdvertisement = async function(req, res) {
    // let property = await Advertise.findOne({_id: req.query.id});
    // if (property.avatar.length>1) {
    //     for(pro of property.avatar)
    //     {
    //         // console.log(path.join(__dirname,'..','\assets',pro))
    //         fs.unlinkSync(path.join(__dirname,'..','\assets',pro));
    //     }
    // } else {
    //     fs.unlinkSync(path.join(__dirname,'..','\assets',property.avatar[0]));
    //     // console.log(path.join(__dirname,'..','\assets',property.avatar[0]))
    // }

    let machine = await Advertise.deleteOne({ _id: req.query.id });
    req.flash('success', 'Advertiser Property removed Successfully');
    return res.redirect('back');

}
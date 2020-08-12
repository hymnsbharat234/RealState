const Contact = require('../models/contact');
const Property = require('../models/property');
const Machine = require('../models/machine');
const Advertise = require('../models/advertise');
// const Advertiser = require('../models/advertiser_property');
const Advertisement = require('../models/advertiser_property');
const News = require('../models/news');




module.exports.home = async function(req, res) {
    let properties = await Property.find({}).sort({ createdAt: -1 });
    let advetiserProperty = await Advertisement.find({}).sort({ createdAt: -1 });
    let news = await News.find({}).sort({ createdAt: -1 });
    let machines = await Machine.find({}).sort({ createdAt: -1 });
    
    return res.render('index', {
        properties: properties,
        advetiserProperty: advetiserProperty,
        machines:machines,
        news:news,
        title: "Home Page"
    });
}

module.exports.about = function(req, res) {

    return res.render('about', {
        title: "About"
    });

}

module.exports.admin = async function(req, res) {

    let users = await Contact.find({}).sort({ createdAt: -1 });
    let properties = await Property.find({}).sort({ createdAt: -1 });
    let machines = await Machine.find({}).sort({ createdAt: -1 });
    let advertiser = await Advertise.find({}).sort({ createdAt: -1 });
    let advetiserProperty = await Advertisement.find({}).sort({ createdAt: -1 });
    let news = await News.find({}).sort({ createdAt: -1 });

    


    return res.render('dashboard', {
        users: users,
        properties: properties,
        machines: machines,
        advertisers: advertiser,
        advetiserProperty: advetiserProperty,
        news:news,
        title: "Admin Dashboard"
    });

}




module.exports.propertyGrid = async function(req, res) {

    let properties = await Property.find({}).sort({ createdAt: -1 });
    return res.render('property-grid', {
        title: "Properties",
        properties: properties
    });
}
module.exports.BlogGrid = function(req, res) {
    
    return res.render('blog-single', {
        title: "Blog"
    });
}
module.exports.News = async function(req, res) {
    let properties = await News.find({}).sort({ createdAt: -1 });
    return res.render('news-grid', {
        title: "News",
        properties: properties
    });
}
module.exports.newsSingle = async function(req, res) {
    let news = await News.findOne({_id:req.query.id});
    return res.render('blog-single', {
        title: "News",
        news: news
    });
}
module.exports.Contact = function(req, res) {

    return res.render('contact', {
        title: "Contact"
    });
}
module.exports.AddNews = function(req, res) {

    return res.render('add-news', {
        title: "Addnews"
    });
}
module.exports.property = function(req, res) {

    if (!req.isAuthenticated()) {
        return res.redirect('/');
    }
    return res.render('post', {
        title: "Add property"
    });
}
module.exports.addAdvertiser = function(req, res) {

    if (!req.isAuthenticated()) {
        return res.redirect('/');
    }
    return res.render('add-advertiser', {
        title: "Add Advertiser property"
    });
}
module.exports.AgentSingle = function(req, res) {

    return res.render('agent-single', {
        title: "Agent_Single"
    });
}
module.exports.AgentGrid = function(req, res) {

    return res.render('agents-grid', {
        title: "Agent_Grid"
    });
}
module.exports.BlogSingle = function(req, res) {

    return res.render('blog-single', {
        title: "Blog_Single"
    });
}
module.exports.PropertySingle = async function(req, res) {
    try{

    let property = await Property.findOne({ _id: req.query.id });
  
    return res.render('property-single', {
        property: property,
        title: "Property_Single"
    });
}
catch(err)
{
    console.log('Error',err);
    return;
}
}
module.exports.singlePremium = async function(req, res) {

    let property = await Advertisement.findOne({ _id: req.query.id });
    return res.render('premium-property-single', {
        property: property,
        title: "Property_Single"
    });
}
module.exports.MachinerySingle = async function(req, res) {

    let property = await Machine.findOne({ _id: req.query.id });
    return res.render('machinery-single', {
        property: property,
        title: "Machinery_Single"
    });
}
module.exports.profile = function(req, res) {

    return res.render('profile', {
        title: "Profile"
    });
}


module.exports.basicTable = async function(req, res) {
    let users = await Contact.find({}).sort({ createdAt: -1 });

    return res.render('basic-table', {
        users: users,
        title: "User Connected"
    });
}

module.exports.Login = function(req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/admin');
    }

    return res.render('login', {
        title: "Login"
    });

}
module.exports.sendMessage = async function(req, res) {

    let contacts = await Contact.create(req.body);
    req.flash('success', 'Message Sent');
    return res.redirect('back');
}
module.exports.AddAdvertise = async function(req, res) {

    let Advertiser = await Advertise.create(req.body);
    req.flash('success', 'Advertise updated');
    return res.redirect('back');
}
module.exports.filterProperty = async function(req, res) {

    let properties;
    if(req.body.type == 'new')
    {
        properties = await Property.find({}).sort({ createdAt: -1 });
    }
    else{
    properties = await Property.find({for:req.body.type});
    }

    return res.render('filtered_properties',{
        title:'Properties',
        properties:properties
    });
}
module.exports.rentMachinery = async function(req, res) {
    let properties = await Machine.find({}).sort({ createdAt: -1 });

    return res.render('rent-machinery', {
        title: "rent-machinery",
        properties: properties
    });
}
module.exports.addMachinery = async function(req, res) {

    req.flash('success', 'Machinery Added');
    return res.render('add-machinery', {
        title: "add-machinery"
    });
}

module.exports.searchProperty = async function(req,res)
 {

     if(req.body.address == '')
     {
        let properties = await Property.find({
            $or: [{rooms:req.body.rooms}, {type: req.body.type}] 
        });
        res.render('filtered_properties',{
            title:'Properties',
            properties:properties
   
        });

       
     }
     else{
    var selected = [];
     let propertis = await Property.find({});
     var addr = req.body.address.toUpperCase();
    //  console.log(propertis);
     
     for(property of propertis)
     {
    //    if(property.address.toUpperCase().indexOf(req.body.address.toUpperCase())){ 
        var add =  property.address.toUpperCase();
        var temp = add.indexOf(addr);
        if(temp>-1){
        selected.push(property);
        }
        }
        res.render('filtered_properties',{
            title:'Properties',
            properties:selected
   
        });
     }


    
 }
const Contact = require('../models/contact');
const Property = require('../models/property');

module.exports.home = async function(req, res) {
    let properties = await Property.find({}).sort({createdAt: -1});
    return res.render('index', {
        properties:properties,
        title: "Home Page"
    });
}

module.exports.about = function(req, res) {

    return res.render('about', {
        title: "About"
    });

}

module.exports.admin = async function(req, res) {

    let users = await Contact.find({}).sort({createdAt: -1});
    let properties = await Property.find({}).sort({createdAt: -1});

    return res.render('dashboard', {
        users:users,
        properties:properties,
        title: "Admin Dashboard"
    });

}




module.exports.propertyGrid =async function(req, res) {

    let properties = await Property.find({}).sort({createdAt: -1});
    return res.render('property-grid', {
        title: "Properties",
        properties:properties
    });
}
module.exports.BlogGrid = function(req, res) {

    return res.render('blog-grid', {
        title: "Blog"
    });
}
module.exports.Contact = function(req, res) {

    return res.render('contact', {
        title: "Contact"
    });
}
module.exports.property = function(req, res) {

    if(!req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('post', {
        title: "Add property"
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

    let property = await Property.findOne({_id:req.query.id});
    return res.render('property-single', {
        property:property,
        title: "Property_Single"
    });
}
module.exports.profile = function(req, res) {

    return res.render('profile', {
        title: "Profile"
    });
}


module.exports.basicTable = async function(req, res) {
    let users = await Contact.find({}).sort({createdAt: -1});

    return res.render('basic-table', {
        users:users,
        title: "User Connected"
    });
}

module.exports.Login = function(req, res) {

    if(req.isAuthenticated()){
        return res.redirect('/admin');
    }

    return res.render('login', {
        title: "Login"
    });

}
module.exports.sendMessage = async function(req, res) {

   let contacts = await Contact.create(req.body);
   req.flash('success','Message Sent');
    return res.redirect('back');
 }

const Contact = require('../models/contact');

module.exports.home = function(req, res) {
    // return res.end('<h2>Express server is running.....</h2>');
    return res.render('index', {
        title: "Home Page"
    });
}

module.exports.about = function(req, res) {

    return res.render('about', {
        title: "About"
    });

}

module.exports.admin = async function(req, res) {

    let users = await Contact.find({});

    return res.render('dashboard', {
        users:users,
        title: "Admin Dashboard"
    });

}


module.exports.powerGrid = function(req, res) {

    return res.render('property-grid', {
        title: "Properties"
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
module.exports.PropertySingle = function(req, res) {

    return res.render('property-single', {
        title: "Property_Single"
    });
}
module.exports.profile = function(req, res) {

    return res.render('profile', {
        title: "Profile"
    });
}


module.exports.basicTable = async function(req, res) {
    let users = await Contact.find({});

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
module.exports.sendMessage = function(req, res) {

    Contact.create(req.body,function(err,user){
        if(err)
        {
            console.log('Error in sending message');
            return;
        }
        return res.redirect('/contact');
    });

   
}

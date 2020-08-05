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

    return res.render('Contact', {
        title: "Contact"
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
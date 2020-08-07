const User = require('../models/user');
const Property = require('../models/property');

module.exports.create = function(req,res)
{
    User.findOne({userId : 'admin'},function(err,user)
    {
        if(err)
        {
            console.log('Error in finding user in signup');
            return;
        }
        if(!user)
        {
            User.create(req.body,function(err,user){
                if(err)
                {
                    console.log('Error in creating account in signup');
                    return;
                }
                return res.redirect('back');
            });
        }

        else{
            return res.redirect('/admin');
        }
    });
}



module.exports.destroySession = function(req,res)
{
    req.logout();

    return res.redirect('/');
} 

module.exports.addProperty = function(req,res)
{
    Property.create(req.body,function(err,done)
    {
        if(err)
        {
            console.log('Error in creating property database',err);
            return;
        }

        return res.redirect('/contact');
    })
}
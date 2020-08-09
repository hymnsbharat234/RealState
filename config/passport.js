const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');


passport.use(new LocalStrategy({
     usernameField: 'userId',
     passReqToCallback:true
},
    function(req,userId,password,done){
    User.findOne({userId:userId},function(err,user)
    {
        if(err)
        {
            console.log('Error in finding user-->Passport');
            req.flash('error',err);
            return done(err);
        }
        if(!user||user.password!=password)
        {
            console.log('Invalid Username/Password');
            req.flash('error','Invalid Username/Password');
            return done(null,false);
        }

        return done(null,user);
    });
}
));

passport.serializeUser(function(user,done)
{
    return done(null,user);
});

passport.deserializeUser(function(id,done)
{
    User.findById(id,function(err,user)
    {
        if(err)
        {
            console.log('Error in finding user');
            return done(err);
        }
        return done(null,user);
    });
});

passport.checkAuthentication = function(req,res,next){
        if(req.isAuthenticated()){
           return next();
        }


        return res.redirect('/admin');
}

passport.setAuthenticatedUser = function(req,res,next)
{
    if(req.isAuthenticated())
    {
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport; 
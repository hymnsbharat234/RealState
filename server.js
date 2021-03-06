const express = require('express')
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport');
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');

const MongoStore = require('connect-mongo')(session);

app.use(express.urlencoded());
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('./assets'));
app.use(session({
    name: 'codeial',
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(10000*60*100)
    },
    store: new MongoStore({
            mongooseConnection: db ,
            autoRemove: 'disabled'

    },function(err)
    {
        if(err){
        console.log('Error in MongoStore');
        }
    })

}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMiddleware.setFlash);



app.use('/', require('./routes/index'));
app.listen(port, function(err) {
    if (err) {
        console.log('Error is : ', err);
        return;
    }
    console.log('Server started at port :', port);
});
//middlewares
const path = require('path');
const multer = require('multer');
const flash = require('connect-flash');
const session = require('express-session');
const bodyPaser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');

module.exports = (app) => {
    app.use(cookieParser());
    app.use(bodyPaser.urlencoded({extended: false}));
    app.use(session({
        secret: 'key-asd-jkl',
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
}
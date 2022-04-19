const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');

//configs
require('./modules/configs')(app);
require('./config/database.js')(mongoose);
require('./config/passport.js')(passport);
app.set('views', path.join(__dirname, 'views') );

//middlewares
require('./modules/middlewares')(app);

//rutas
require('./app/router.js')(app, passport);


//static | public

app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
    console.log("Server Running on port ", app.get('port'))
})
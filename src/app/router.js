const fs = require('fs');
const routes = fs.readdirSync('./src/app/routes').filter(file => file.endsWith('.js'));

module.exports = (app, passport) => {
    for (file of routes){
        const route = require(`./routes/${file}`);
        route.enrouter(app, passport);
    }
}
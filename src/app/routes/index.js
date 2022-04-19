    const isLoggedIn = (req, res, next) => {
        if(req.isAuthenticated()) {
        return next();
        }
        res.redirect('/');
    }
    
    module.exports = {
        enrouter(app, passport) {
            app.get('/', (req, res) => {
                res.render('index', {
                    path: "",
                    lang: "es"
                })
            })
        }
    }
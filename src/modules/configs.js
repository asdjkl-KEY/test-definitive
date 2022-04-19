//configuraciones


module.exports = (app) => {
    app.set('view engine', 'ejs');
    app.set('port', process.env.PORT || 2735)
}
// const path = require('path');

// Routes
module.exports = function(app) {

    app.get('/',
        function(req, res) {
            res.render('home', { user: req.user });
        });
    app.get('/login',
        function(req, res){
            res.render('login');
        });
    app.get('/login/google',
        passport.authenticate('google'));
    app.get('/return',
        passport.authenticate('google', { failureRedirect: '/login' }),
        function(req, res) {
            res.redirect('/');
        });
    app.get('/profile',
        require('connect-ensure-login').ensureLoggedIn(),
        function(req, res){
            res.render('profile', { user: req.user });
        });

};
// Requiring path to so we can use relative routes to our HTML files


// Requiring our custom middleware for checking if a user is logged in
let isAuthenticated = require('../config/middleware/isAuthenticated.js');

// Routes

module.exports = function(app) {

    app.get('/', function(req, res) {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect('/index');
        }
        res.render('signup');
    });

    app.get('/signup', function(req, res) {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect('/index');
        }
        res.render('signup');
    });

    // Here we've add our isAuthenticated middleware to this route.
    // If a user who is not logged in tries to access this route they will be redirected to the signup page
    app.get('/index', isAuthenticated, function(req, res) {
        res.render('index');
    });
};

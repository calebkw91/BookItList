// Requiring path to so we can use relative routes to our HTML files


// Requiring our custom middleware for checking if a user is logged in
// eslint-disable-next-line no-unused-vars
const db = require('../models');

// Routes

module.exports = function(app) {

    // Here we've add our isAuthenticated middleware to this route.
    // If a user who is not logged in tries to access this route they will be redirected to the signup page
    app.get('/', function(req, res) {
        res.render('login');
    });

    app.get('/signup', function(req, res) {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect('login');
        }
        res.render('signup');
    });

    app.get('/add', (req, res) => {
        res.render('add');
    });

    app.get('/search', (req, res) => {
        res.render('search');
    });
};

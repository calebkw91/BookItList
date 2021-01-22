// eslint-disable-next-line no-unused-vars
const db = require('../models');
let path = require('path');

// Routes
module.exports = function(app) {
    app.get('/', (req, res) => {
        res.render('login', {
            layout: 'login'
        });
    });

    app.get('/signup', (req, res) => {
        res.render('signup');
    });

    app.get('/add', (req, res) => {
        res.render('add');
    });

    app.get('/search', (req, res) => {
        res.render('search');
    });

    app.get('/authors', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/author-manager.html'));
    });

};

// eslint-disable-next-line no-unused-vars
const db = require('../models');

module.exports = function (app) {
    app.get('/', (req, res) => {
        res.render('login', {
            layout: 'login',
        });
    });

    app.get('/add', function (req, res) {
        res.render('add');
    });

    app.get('/search', (req, res) => {
        res.render('search');
    });
};

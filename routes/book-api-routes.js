// Requiring our models as we've configured it
const db = require('../models');


module.exports = function (app) {

    app.get('/dashboard', (req, res) => {
        db.Book.findAll({}).then((data) => {
            let books = [];
            data.forEach((item) => {
                books.push(item.dataValues);
            });
            console.log(books);
            let hbsObject = { books: books };
            console.log(hbsObject);

            res.render('index', hbsObject);
        });
    });

    app.get('/login', (req, res) => {
        res.render('login');
    });

    app.get('/add', function (req, res) {
        res.render('add');
    });

    app.get('/api/key', (req, res) => {
        res.send(process.env.GOOGLE_API_KEY);
    });

    app.post('/api/add', (req, res) => {
        console.log(req.body);
        db.Book.create(req.body).then(() => {
            res.render('index');
        });
    });

    app.post('/api/dashboard', (req, res) => {
        console.log(req.body);
        db.Book.create(req.body).then(() => {
            res.render('index');
        });
    });

    app.put('/api/bookedit/:id', (req, res) => {
        console.log(req.params);
        db.Book.update(
            {
                bookedIt: 1,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        ).then(() => {
            res.render('index');
        });
    });

    app.delete('/api/bookedit/:id', (req, res) => {
        console.log(req.params);
        db.Book.destroy({
            where: {
                id: req.params.id,
            },
        }).then(() => {
            res.render('index');
        });
    });
};

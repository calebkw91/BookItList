// Requiring our models as we've configured it
const db = require('../models');


module.exports = function (app) {

    app.get('/dashboard', (req, res) => {
        if(req.user){
            userId = req.user.id;

            db.Book.findAll({
                include: db.User,
                where: {
                    UserId: userId
                }
            }).then((data) => {
                let books = [];
                data.forEach((item) => {
                    books.push(item.dataValues);
                });
                let hbsObject = { books: books };

                res.render('index', hbsObject);
            });
        } else {
            res.render('login');
        }
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

    app.get('/edit/:id', (req, res) => {
        db.Book.findOne({
            where: {
                id: req.params.id
            }
        }).then((data) => {
            let hbsObject = data.dataValues;
            res.render('edit', hbsObject);
        });
    });

    app.put('/api/edit', (req, res) => {
        db.Book.update(
            req.body, {
                where: {
                    id: req.body.id
                }
            }).then(function() {
            res.render('index');
        });
    });

    app.post('/api/add', (req, res) => {
        db.Book.create(req.body).then(() => {
            res.render('index');
        });
    });

    app.put('/api/bookedit/:id', (req, res) => {
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
        db.Book.destroy({
            where: {
                id: req.params.id,
            },
        }).then(() => {
            res.render('index');
        });
    });
};

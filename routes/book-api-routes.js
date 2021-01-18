let db = require('../models');

module.exports = function(app) {
    app.get('/', (req, res) => {
        res.render('index');
    });

    // app.get('/api/books', (req, res) => {
    //     db.Book.findAll({
    //         include: [db.Post]
    //     }).then((book) => {
    //         res.json(book);
    //     });
    // });

    // app.get('/api/books/:id', (req, res) => {
    //     db.Book.findOne({
    //         where: {
    //             id: req.params.id
    //         }
    //     }).then((book) => {
    //         res.json(book);
    //     });
    // });

    app.post('/api/books', (req, res) => {
        console.log(req.body);
        db.Book.create(req.body).then((book) => {
            res.json(book);
        });
    });

    // app.delete('/api/books/:id', (req, res) => {
    //     db.Book.destroy({
    //         where: {
    //             id: req.params.id
    //         }
    //     }).then((book) => {
    //         res.json(book);
    //     });
    // });
};

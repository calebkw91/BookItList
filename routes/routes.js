let db = require('../models');

module.exports = function(app) {
    app.get('/api/dbBookit', function(req, res) {
        db.dbBookit.findAll({
            include: [db.Post]
        }).then(function(dbBookit) {
            res.json(dbBookit);
        });
    });

    app.get('/api/dbBookit/:id', function(req, res) {
        db.dbBookit.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Post]
        }).then(function(dbBookit) {
            res.json(dbBookit);
        });
    });

    app.post('/api/dbBookit', function(req, res) {
        db.dbBookit.create(req.body).then(function(dbBookit) {
            res.json(dbBookit);
        });
    });

    app.delete('/api/dbBookit/:id', function(req, res) {
        db.dbBookit.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbBookit) {
            res.json(dbBookit);
        });
    });

};

// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
const express = require('express');
const session = require('express-session');
require('dotenv').config();

// Requiring passport as we've configured it
let passport = require('./config/passport');
// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

// Requiring our models for syncing
const db = require('./models');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static('public'));

// We need to use sessions to keep track of our user's login status

app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Handlebars engine
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Routes
// =============================================================
require('./routes/book-api-routes')(app);
require('./routes/html-routes')(app);
require('./routes/passport-api-routes')(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`App listening on http://localhost:${PORT}`);
    });
});

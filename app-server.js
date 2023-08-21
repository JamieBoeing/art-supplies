
const express = require('express')
require('./config/database');
const app = express()
const path = require('path')
const logger = require('morgan')

// middleware



app.use(express.json()) // req.body
app.use((req, res, next) => {
    res.locals.data = {}
    next()
})
app.use(express.static(path.join(__dirname, 'public')))
app.use(require('./config/checkToken'));
app.use(logger('dev'));
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
// check if token and create req.user

app.use('/api/users', require('./routes/api/users'));
// protect the API routes below from anonymous users
const ensureLoggedIn = require('./config/ensureLoggedIn');
app.use('/api/items', ensureLoggedIn, require('./routes/api/items'));
app.use('/api/orders', ensureLoggedIn, require('./routes/api/orders'));

// sends to react router catch all
app.get('*', function(req, res) {
    res.sendFile(path.resolve(path.join(__dirname, 'public', 'index.html')));
});


module.exports = app

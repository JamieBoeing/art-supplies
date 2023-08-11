
const express = require('express')
const app = express()

// middleware
app.use(express.json()) // req.body
app.use((req, res, next) => {
    res.locals.data = {}
    next()
})




module.exports = app

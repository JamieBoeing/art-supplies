require('dotenv').config();
require('./config/database')
const mongoose = require('mongoose')

const app = require('./app-server')
const PORT = process.env.PORT || 8080



app.listen(PORT, () => {
	console.log(`We hear you loud and clear at PORT ${PORT}`)
})
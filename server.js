require('dotenv').config();
require('./config/database')


const app = require('./app-server')
const PORT = process.env.PORT || 8001




// Check if token and create req.user
app.use(require('./config/checkToken'))


// put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'))
// protect the API routes below from anonymous users


// Protect the API routes below from anonymous users
const ensureLoggedIn = require('./config/ensureLoggedIn')
app.use('/api/items', ensureLoggedIn, require('./routes/api/items'))
app.use('/api/orders', ensureLoggedIn, require('./routes/api/orders'))


app.listen(PORT, () => {
	console.log(`We hear you loud and clear at PORT ${PORT}`)
})
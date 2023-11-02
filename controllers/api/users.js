require('dotenv').config()
const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// Middleware function to check users token
const checkToken = (req, res) => {
    console.log('req.user', req.user)
    res.json(req.exp)
}





// controllers for handling user data
const userController = {
    // POST Creae user
    async createUser(req, res, next) {
    try { 
        // Create a new user in the database
        const user = await User.create(req.body)

        // Generate a JWT token 
        const token = createJWT(user)
       
        // Prepare response data with user and token
        res.locals.data.user = user
        res.locals.data.token = token
        
        // Call next
        next()
    } catch(error) {
        console.log('you got a database problem')
        res.status(400).json({message: error.message})
    }
},
// POST Log in user
async logInUser(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email })
        if(!user) throw new Error()
       // compare the provided password with the users stored password
        const match = await bcrypt.compare(req.body.password, user.password)
        if (!match) throw new Error()
        // prepare response data with user and token
        res.locals.data.user = user
        res.locals.data.token = createJWT(user)
        next()
        } catch (error) {
            res.status(400).json({ message: 'WRONG USER BUDDY' })
        } 
},
// PUT Udate user
async updateUser(req, res) { 
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.id })
        if (!user) throw new Error('User not found')
        res.locals.data.user = user
        res.locals.data.token = createJWT(user)
        next()
    } catch(error) {
        res.status(400).json({ message: error.message})
    }
},

async deleteUser(req, res) {
    try {
        const user = await User.findOne({ _id: req.params.id })
        await user.deleteOne()
        if (!user) throw new Error('User not found')
        res.json ({  message: 'User Deleted' })
    } catch(error) {
        res.status(400).json({ message: error.message})
    }
},

async showUser(req, res) {
    try {
        const user = await User.findOne({ _id: req.params.id })
        res.json({ user })
    } catch(error) {
        res.status(400).json({ message: error.message})
    }
},

 async showAllUsers(req, res) {
    try {
        const showAllUsers = await User.find({ })
        res.json({ user: showAllUsers })
    } catch(error) {
        res.status(400).json({ message: error.message})
    }
}
}
const apiController = {
    auth(req, res) {
        res.json(res.locals.data.token)
    }
}


module.exports = {
    userController,
    apiController, 
    checkToken
}

// Helper functions
 
function createJWT(user) {
    return jwt.sign(
        {user},
        process.env.SECRET,
        { expiresIn: '72h'}
    )
}
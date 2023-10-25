require('dotenv').config()
const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// middleware function to check user's token
const checkToken = (req, res) => {
    console.log('req.user', req.user)
    res.json(req.exp)
}

// controllers for handling user data
const dataController = {

async createUser (req, res, next) {
    try {
        // create a new user in the database
        const user = await new User.createUser(req.body)
        // generate jwt token for the user
        const token = createJWT(user)
        // prepare the response data with user and token 
        res.locals.data.user = user
        res.locals.data.token = token
        next()
    } catch(error) {
        res.status(400).json({ message: error.message})
    }
},

async logInUser (req, res, next) {
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
            res.status(400).json({ message: 'Hello, Welcome!' })
        } 
},

async logOutUser (req, res) {
    try {
        req.user.isLoggedIn = false 
        await req.user.save()
        res.json ({  message: 'Logout Successful' })
    } catch(error) {
        res.status(400).json({ message: error.message})
    }
},

async updateUser (req, res, next) { 
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

async deleteUser (req, res) {
    try {
        const user = await User.findOne({ _id: req.params.id })
        await user.deleteOne()
        if (!user) throw new Error('User not found')
        res.json ({  message: 'User Deleted' })
    } catch(error) {
        res.status(400).json({ message: error.message})
    }
},

async showUser (req, res) {
    try {
        const user = await User.findOne({ _id: req.params.id })
        res.json({ user })
    } catch(error) {
        res.status(400).json({ message: error.message})
    }
},

async showAllUsers (req, res) {
    try {
        const showAllUsers = await User.find({ })
        res.json({ user: showAllUsers })
    } catch(error) {
        res.status(400).json({ message: error.message})
    }
}
}// api authentiction
const apiController = {
    auth (req, res) {
        res.json(res.locals.data.token)
    }
}

module.exports = {
    checkToken,
    dataController,
    apiController
}

/* -- Helper Functions -- */

function createJWT (user) {
    return jwt.sign(
        // data payload
        { user },
        process.env.SECRET,
        { expiresIn: '72h' }
    )
}
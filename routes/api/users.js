const express = require('express')
const router = express.Router()
const{ userController } = require('../../controllers/api/users')
const ensureLoggedIn = require('../../config/ensureLoggedIn')
const checkToken = require('../../config/checkToken')

// POST api/users
router.post('/', userController.createUser)
// POST api/ users/ loginUser
router.post('/login', userController.logInUser)
// POST logOutUser
router.post('/logout', userController.logOutUser)
// PUT updateUser
router.put('/:id', userController.updateUser)
// DELETE deleteUser
router.delete('/:id', userController.deleteUser)
// GET showUser
router.get('/:id', userController.showUser)
// GET showAllUsers
router.get('/:id', userController.showAllUsers)
// GET -> /api/users/check-token - Verify User Authentication
router.get('/check-token', ensureLoggedIn, checkToken)


module.exports = router 

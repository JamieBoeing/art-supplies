const express = require('express')
const router = express.Router()
const{ userController, apiController, checkToken } = require('../../controllers/api/users')
const ensureLoggedIn = require('../../config/ensureLoggedIn')


// POST api/users
router.post('/', userController.createUser, apiController.auth)
// POST api/ users/ loginUser
router.post('/login', userController.logInUser, apiController.auth)
// POST logOutUser
// router.post('/logout', userController.logOutUser)
// PUT updateUser
router.put('/:id', userController.updateUser, apiController.auth)
// DELETE deleteUser
router.delete('/:id', userController.deleteUser)
// GET showUser
router.get('/:id', userController.showUser)
// GET showAllUsers
router.get('/:id', userController.showAllUsers)
// GET -> /api/users/check-token - Verify User Authentication
router.get('/check-token', ensureLoggedIn, checkToken)


module.exports = router 

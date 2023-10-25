const express = require('express')
const router = express.Router()
const  { checkToken, dataController, apiController} = require('../../controllers/api/users')
const ensureLoggedIn = require('../../config/ensureLoggedIn')

// POST api/users
router.post('/', dataController.createUser, apiController.auth)

// POST api/ users/ loginUser
router.post('/login', dataController.logInUser, apiController.auth)
// POST logOutUser
router.post('/logout', dataController.logOutUser)
// PUT updateUser
router.put('/:id',dataController.updateUser, apiController.auth)
// DELETE deleteUser
router.delete('/:id', dataController.deleteUser )
// GET showUser
router.get('/:id', dataController.showUser)
// GET showAllUsers
router.get('/:id', dataController.showAllUsers)

// GET api/users/check-token
router.get('/check-token', ensureLoggedIn, checkToken)

module.exports = router 

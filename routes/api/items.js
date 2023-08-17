const express = require('express');
const router = express.Router();
const itemsCtrl = require('../../controllers/api/items');
const { checkToken, dataController, apiController} = require('../../controllers/api/users')

// GET /api/items
router.get('/', itemsCtrl.index);

// GET /api/items/:id 
router.get('/:id', itemsCtrl.show);

module.exports = router;

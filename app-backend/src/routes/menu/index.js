const express = require('express');
const menuController = require('../../controllers/menu.controller');
const router = express.Router()

router.post('/addMenu', menuController.addMenu)
router.get('/getAllMenu' , menuController.getAllMenu)

module.exports = router
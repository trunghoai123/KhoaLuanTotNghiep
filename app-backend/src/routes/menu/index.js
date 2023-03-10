const express = require('express');
const menuController = require('../../controllers/menu.controller');
const router = express.Router()

router.post('/menu/add', menuController.addMenu)

module.exports = router
const express = require('express');
const areaController = require('../../controllers/area.controller');
const router = express.Router()

router.get('/getAllArea' , areaController.getAllArea)
router.post('/addArea' , areaController.addArea)

module.exports = router
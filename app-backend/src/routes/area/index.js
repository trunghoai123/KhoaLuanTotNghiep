const express = require('express');
const areaController = require('../../controllers/area.controller');
const router = express.Router()

router.get('/getAllArea' , areaController.getAllArea)
router.post('/addArea' , areaController.addArea)
router.post('/updateArea' , areaController.updateArea)
router.post('/deleteArea' , areaController.deleteArea)

module.exports = router
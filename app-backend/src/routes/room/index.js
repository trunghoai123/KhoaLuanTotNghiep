const express = require('express');
const roomController = require('../../controllers/room.controller');
const router = express.Router()

router.get('/getAllRoom' , roomController.getAllRoom)
router.post('/addRoom' , roomController.addRoom)

module.exports = router
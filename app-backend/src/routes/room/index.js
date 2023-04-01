const express = require('express');
const roomController = require('../../controllers/room.controller');
const router = express.Router()

router.get('/getAllRoom' , roomController.getAllRoom)
router.get('/getRoomById/:roomId' , roomController.getRoomById)
router.post('/addRoom' , roomController.addRoom)
router.post('/updateRoom' , roomController.updateRoom)
router.post('/deleteRoom' , roomController.deleteRoom)
router.get('/getRoomMatchTimeAndSeat' , roomController.getRoomMatchTimeAndSeat)
router.get('/getRoomByAreaId' , roomController.getRoomByAreaId)
router.get('/getRoomByRoomId' , roomController.getRoomByRoomId)
router.get('/getRoomByTypeRoomId' , roomController.getRoomByTypeRoomId)
router.get('/getRoomByAll' , roomController.getRoomByAll)

module.exports = router
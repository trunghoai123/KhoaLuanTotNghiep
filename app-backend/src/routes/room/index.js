const express = require('express');
const roomController = require('../../controllers/room.controller');
const router = express.Router()

router.get('/getAllRoom' , roomController.getAllRoom)
router.get('/getRoomById/:roomId' , roomController.getRoomById)
router.post('/addRoom' , roomController.addRoom)
router.post('/updateRoom' , roomController.updateRoom)
router.post('/deleteRoom' , roomController.deleteRoom)
router.post('/getRoomMatchTimeAndSeat' , roomController.getRoomMatchTimeAndSeat)
router.post('/getRoomByAreaId' , roomController.getRoomByAreaId)
router.post('/getRoomByRoomId' , roomController.getRoomByRoomId)
router.post('/getRoomByTypeRoomId' , roomController.getRoomByTypeRoomId)
router.post('/getRoomByAll' , roomController.getRoomByAll)

module.exports = router
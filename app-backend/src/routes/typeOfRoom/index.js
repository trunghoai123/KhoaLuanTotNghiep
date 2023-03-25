const express = require('express');
const typeOfRoomController = require('../../controllers/typeOfRoom.controller');
const router = express.Router()

router.get('/getAllTypeOfRoom' , typeOfRoomController.getAllTypeOfRoom)
// router.get('/getTypeOfRoomById/:TypeOfRoomId' , typeOfRoomController.getTypeOfRoomById)
router.post('/addTypeOfRoom' , typeOfRoomController.addTypeOfRoom)
router.post('/updateTypeOfRoom' , typeOfRoomController.updateTypeOfRoom)
router.post('/deleteTypeOfRoom' , typeOfRoomController.deleteTypeOfRoom)


module.exports = router
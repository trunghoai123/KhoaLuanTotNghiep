const express = require('express');
const tableController = require('../../controllers/table.controller');
const router = express.Router()

router.get('/getAllTable' , tableController.getAllTable)
router.get('/getTableById/:tableId' , tableController.getTableById)
router.post('/addTable' , tableController.addTable)
router.post('/updateTable' , tableController.updateTable)
router.post('/deleteTable' , tableController.deleteTable)
router.get('/getTableByAll' , tableController.getTableByAll)
router.get('/getTableByRoomId' , tableController.getTableByRoomId)
router.get('/getTableMatchTimeAndSeat' , tableController.getTableMatchTimeAndSeat)


module.exports = router
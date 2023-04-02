const express = require('express');
const tableController = require('../../controllers/table.controller');
const router = express.Router()

router.get('/getAllTable' , tableController.getAllTable)
router.post('/getTableByTableId' , tableController.getTableByTableId)
router.get('/getTableById/:tableId' , tableController.getTableById)
router.post('/addTable' , tableController.addTable)
router.post('/updateTable' , tableController.updateTable)
router.post('/deleteTable' , tableController.deleteTable)
router.post('/getTableByAll' , tableController.getTableByAll)
router.post('/getTableByRoomId' , tableController.getTableByRoomId)
router.post('/getTableMatchTimeAndSeat' , tableController.getTableMatchTimeAndSeat)


module.exports = router
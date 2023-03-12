const express = require('express');
const tableController = require('../../controllers/table.controller');
const router = express.Router()

router.get('/getAllTable' , tableController.getAllTable)
router.post('/addTable' , tableController.addTable)


module.exports = router
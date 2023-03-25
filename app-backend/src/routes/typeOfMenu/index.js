const express = require('express');
const typeOfMenuController = require('../../controllers/typeOfMenu.controller');
const router = express.Router()

router.get('/getAllTypeOfMenu' , typeOfMenuController.getAllTypeOfMenu)
// router.get('/getTypeOfMenuById/:TypeOfMenuId' , typeOfMenuController.getTypeOfMenuById)
router.post('/addTypeOfMenu' , typeOfMenuController.addTypeOfMenu)
router.post('/updateTypeOfMenu' , typeOfMenuController.updateTypeOfMenu)
router.post('/deleteTypeOfMenu' , typeOfMenuController.deleteTypeOfMenu)


module.exports = router
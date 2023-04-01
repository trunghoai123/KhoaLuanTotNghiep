const express = require("express");
const areaController = require("../../controllers/area.controller");
const router = express.Router();

<<<<<<< HEAD
router.get("/getAllArea", areaController.getAllArea);
router.get("/getAreaById/:areaId", areaController.getAreaById);
router.post("/addArea", areaController.addArea);
router.post("/updateArea", areaController.updateArea);
router.post("/deleteArea", areaController.deleteArea);
=======
router.get('/getAllArea' , areaController.getAllArea)
router.get('/getAreaByAreaId' , areaController.getAreaByAreaId)
router.get('/getAreaById/:areaId' , areaController.getAreaById)
router.post('/addArea' , areaController.addArea)
router.post('/updateArea' , areaController.updateArea)
router.post('/deleteArea' , areaController.deleteArea)
>>>>>>> feed_khoa

module.exports = router;

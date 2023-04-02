const express = require("express");
const areaController = require("../../controllers/area.controller");
const router = express.Router();

router.get("/getAllArea", areaController.getAllArea);
router.post("/getAreaByAreaId", areaController.getAreaByAreaId);
router.get("/getAreaById/:areaId", areaController.getAreaById);
router.post("/addArea", areaController.addArea);
router.post("/updateArea", areaController.updateArea);
router.post("/deleteArea", areaController.deleteArea);

module.exports = router;

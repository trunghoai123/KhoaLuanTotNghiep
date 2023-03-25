const express = require("express");
const menuController = require("../../controllers/menu.controller");
const router = express.Router();

router.post("/addMenu", menuController.addMenu);
router.get("/getAllMenu", menuController.getAllMenu);
router.post("/updateMenu", menuController.updateMenu);
router.post("/deleteMenu", menuController.deleteMenu);
router.get("/getOneMenu/:dishId", menuController.getOneMenu);

module.exports = router;

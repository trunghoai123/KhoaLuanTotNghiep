const express = require("express");
const { apiKey } = require("../auth/checkAuth");
const router = express.Router();

//router.use(apiKey)

router.use("/api/menu", require("./menu"));
router.use("/api/table", require("./table"));
router.use("/api/area", require("./area"));
router.use("/api/room", require("./room"));
router.use("/api/account", require("./account"));
router.use("/api/order", require("./order"));
router.use("/api/customer", require("./customer"));
router.use("/api/typeOfRoom", require("./typeOfRoom"));
router.use("/api/typeOfMenu", require("./typeOfMenu"));
router.use("/api/image", require("./image"));

// router.get('', (req, res , next) => {
//     return res.status(200).json({
//         message: 'OK',
//     })
// })

module.exports = router;

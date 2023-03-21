const express = require('express');
const imageController = require('../../controllers/image.controller');
const router = express.Router()

router.post('/sendImageAndGetLink' , imageController.sendImageAndGetLink)

module.exports = router
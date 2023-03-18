const express = require('express');
const customerController = require('../../controllers/customer.controller');
const router = express.Router()

router.get('/getCustomerByUserId' , customerController.getCustomerByUserId)

module.exports = router
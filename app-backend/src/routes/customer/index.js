const express = require('express');
const customerController = require('../../controllers/customer.controller');
const router = express.Router()

router.post('/getCustomerByUserId' , customerController.getCustomerByUserId)
router.post('/getCustomerByPhone' , customerController.getCustomerByPhone)
router.post('/updateCustomer' , customerController.updateCustomer)
router.post('/addCustomer' , customerController.addCustomer)
router.post('/deleteCustomer' , customerController.deleteCustomer)

module.exports = router
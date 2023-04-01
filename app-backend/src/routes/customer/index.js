const express = require('express');
const customerController = require('../../controllers/customer.controller');
const router = express.Router()

router.get('/getCustomerByUserId' , customerController.getCustomerByUserId)
router.get('/getCustomerByPhone' , customerController.getCustomerByPhone)
router.post('/updateCustomer' , customerController.updateCustomer)
router.post('/addCustomer' , customerController.addCustomer)
router.post('/deleteCustomer' , customerController.deleteCustomer)

module.exports = router
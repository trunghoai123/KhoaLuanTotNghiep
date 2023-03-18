const express = require('express');
const orderController = require('../../controllers/order.controller');
const router = express.Router()

router.post('/addOrder', orderController.addOrder)
router.get('/getOrderByUser', orderController.getOrderByUser)
router.get('/getOrderDetailByOrder', orderController.getOrderDetailByOrder)
router.get('/getAllOrder', orderController.getAllOrder)

module.exports = router
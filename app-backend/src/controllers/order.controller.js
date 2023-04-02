const OrderService = require("../services/order.service");

class OrderController {
  addOrder = async (req, res, next) => {
    try {
      const result = await OrderService.addOrder(req.body);
      return res.status(result.code).json(result.metadata);
    } catch (err) {
      next(err);
    }
  };
  getOrderByUser = async (req, res, next) => {
    try {
      const result = await OrderService.getOrderByUser(req.body);
      return res.status(result.code).json(result.metadata);
    } catch (err) {
      next(err);
    }
  };
  getOrderDetailByOrder = async (req, res, next) => {
    try {
      const result = await OrderService.getOrderDetailByOrder(req.body);
      return res.status(result.code).json(result.metadata);
    } catch (err) {
      next(err);
    }
  };
  getAllOrder = async (req, res, next) => {
    try {
      const result = await OrderService.getAllOrder(req.body);
      return res.status(result.code).json(result.metadata);
    } catch (err) {
      next(err);
    }
  };
  getOrderById = async (req, res, next) => {
    try {
      const result = await OrderService.getOrderById(req.body);
      return res.status(result.code).json(result.metadata);
    } catch (err) {
      next(err);
    }
  };
  updateOrder = async (req, res, next) => {
    try {
      const result = await OrderService.updateOrder(req.body);
      return res.status(result.code).json(result.metadata);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new OrderController();

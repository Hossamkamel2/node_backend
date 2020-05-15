const express = require('express');
const orderController = require('../controllers/orderController');
const router = express.Router();
const orderValidator = require('../validators/orderValidator');
const isAuth = require('../middlewares/isAuth');
const isAdmin = require('../middlewares/isAdmin');

router.get('/getMyOrders', isAuth, orderController.getMyOrders);

router.get('/:orderId', isAuth, orderValidator.getOrderByIdValidate, orderController.getOrderById);

router.get('/', isAuth, isAdmin, orderController.getAllOrders);

router.delete('/:orderId', isAuth, orderValidator.deleteOrderValidate, orderController.deleteOrder);

router.post('/', isAuth, orderController.addOrder);

router.patch('/', isAuth, isAdmin, orderValidator.changeOrderStatusValidate, orderController.changeOrderStatus);

module.exports = router;
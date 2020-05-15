const express = require('express');
const cartController = require('../controllers/cartController');
const router = express.Router();
const cartValidator = require('../validators/cartValidator');
const isAuth = require('../middlewares/isAuth');

router.post('/', isAuth, cartValidator.addToCartValidate, cartController.addToCart);

router.delete('/reduceOne/:productId', isAuth, cartValidator.reduceOneProductFromCartValidate, cartController.reduceOneProductFromCart);

router.delete('/deleteProduct/:productId', isAuth, cartValidator.reduceOneProductFromCartValidate, cartController.removeProductFromCart);

router.delete('/', isAuth, cartController.clearUserCart);

router.get('/', isAuth, cartController.getCart);

module.exports = router;
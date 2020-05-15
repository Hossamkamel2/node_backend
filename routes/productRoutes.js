const express = require('express');
const productController = require('../controllers/productController');
const productValidator = require('../validators/productValidator');
const router = express.Router();
const isAuth = require('../middlewares/isAuth');
const isAdmin = require('../middlewares/isAdmin');
const upload = require('../middlewares/upload');

router.get('/pagination', productValidator.getProductsPagination, productController.getProductsWithPagination);

router.get('/getUserProducts/:userId', isAuth, productValidator.getUserProductsValidate, productController.getUserProducts);

router.get('/:productId', isAuth, productValidator.getProductByIdValidate, productController.getProductById);

router.get('/', isAuth, productController.getAllProducts);

router.post('/',isAuth, isAdmin, upload.single('imageUrl'), productValidator.addProductValidate, productController.addProduct);

router.delete('/:productId',isAuth, isAdmin, productValidator.deleteProductValidate, productController.deleteProduct);

router.patch('/',isAuth, isAdmin, upload.single('imageUrl'), productValidator.editProductValidate, productController.editProduct);

module.exports = router;
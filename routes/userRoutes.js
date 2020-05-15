const express = require('express');
const userController = require('../controllers/userController');
const userValidator = require('../validators/userValidator');
const router = express.Router();
const isAuth = require('../middlewares/isAuth');
const upload = require('../middlewares/upload');

router.get('/', isAuth, userController.getUser);

router.patch('/', isAuth, upload.single('imageUrl'), userValidator.editUserValidate, userController.editUser);

module.exports = router;